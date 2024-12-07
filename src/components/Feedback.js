import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ConstructionIcon from '@mui/icons-material/Construction';
import CustomAlert from "./CustomAlert";

const FeedbackDialog = ({ open, onClose, avaliacao, feedback }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle align={"center"}>Avaliação e Feedback</DialogTitle>
      <DialogContent>
        <Grid container spacing={3} paddingTop={2}>
          <Grid item xs={12}>
            <Typography variant="h6" color="primary">
              Avaliação
            </Typography>
          </Grid>
          {["pesoAroma", "pesoCor", "pesoSabor", "pesoCorpo", "pesoPersistencia"].map((field, index) => (
            <Grid item xs={12} key={index}>
              <Typography variant="body1">
                <strong>{field.replace("peso", "Peso ")}:</strong> {avaliacao?.[field] || "N/A"}
              </Typography>
            </Grid>
          ))}

          <Grid item xs={12}>
            <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
              Feedback
            </Typography>
          </Grid>
          <Grid item xs={12}>

            <Typography variant="body1">
              {feedback?.descricaoFeedback
                ? feedback.descricaoFeedback.split("\n").map((line, index) => (
                  <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                    {line === "Parece que temos um especialista." ? (
                      <>
                        <span style={{ fontWeight: "bold", color: "green", marginRight: "8px" }}>{line}</span>
                        <ThumbUpIcon style={{ color: "green" }} />
                      </>
                    ) : line === "Continua a trabalhar estas quase." ? (
                      <>
                        <span style={{ color: "orange", marginRight: "8px" }}>{line}</span>
                        <ConstructionIcon style={{ color: "orange" }} />
                      </>
                    ) : (
                      <span>{line}</span>
                    )}
                  </div>
                ))
                : "Sem feedback disponível."}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};



const Feedback = () => {
  const [configuracoes, setConfiguracoes] = useState([]);
  const [avaliacoesByTheUser, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAvaliacao, setSelectedAvaliacao] = useState(null); // Store the selected avaliação
  const [selectedFeedback, setSelectedFeedback] = useState(null); // Store the selected avaliação
  const [alert, setAlert] = useState({ open: false, message: "", type: "" });
  const showAlert = (message, type) => {
    setAlert({ open: true, message, type });
  };
  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        if (!token || !userId) {
          showAlert("User não autenticado.", "error");
          setLoading(false);
          return;
        }

        const [avaliacoesResp, configuracoesResp] = await Promise.all([
          // REMOTE
          axios.get("https://sommelierpath-2.onrender.com/api/v1/avaliacao", {
          // LOCAL
          // axios.get("http://localhost:3000/api/v1/avaliacao", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          // REMOTE
          axios.get("https://sommelierpath-2.onrender.com/api/v1/configuracao", {
          // LOCAL
          // axios.get("http://localhost:3000/api/v1/configuracao", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const avaliacoes = avaliacoesResp.data.filter(
          (avaliacao) => avaliacao.userId === userId
        );

        const finishedConfiguracoes = configuracoesResp.data.filter((config) =>
          avaliacoes.some((avaliacao) => avaliacao.configuracaoId === config._id)
        );

        setAvaliacoes(avaliacoes);
        setConfiguracoes(finishedConfiguracoes);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchWithAuth = async (url) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User não autenticado.");
    }
    return axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
  };

  const handleAvaliarClick = async (configuracaoId) => {
    try {

      const avaliacao = avaliacoesByTheUser.find(
        (avaliacao) => avaliacao.configuracaoId === configuracaoId
      );

      if (!avaliacao) {
        showAlert("Nenhuma avaliação encontrada para esta configuração.","error");
        return;
      }

      // Fetch Avaliação and Feedback concurrently
      const [avaliacaoResponse, feedbackResponse] = await Promise.all([
        // LOCAL
        // fetchWithAuth(`http://localhost:3000/api/v1/avaliacao/${avaliacao._id}`),
        // fetchWithAuth(`http://localhost:3000/api/v1/feedback/avaliacao/${avaliacao._id}`),
        // REMOTE
        fetchWithAuth(`https://sommelierpath-2.onrender.com/api/v1/avaliacao/${avaliacao._id}`),
        fetchWithAuth(`https://sommelierpath-2.onrender.com/api/v1/feedback/avaliacao/${avaliacao._id}`),
      ]);

      // Validate responses
      if (!avaliacaoResponse.data || !feedbackResponse.data) {
        showAlert("Erro ao carregar dados de avaliação ou feedback.","error");
        return;
      }

      setSelectedAvaliacao(avaliacaoResponse.data);
      setSelectedFeedback(feedbackResponse.data);

      console.log(feedbackResponse.data);

      setDialogOpen(true);
    } catch (error) {
      console.error("Erro na request da avaliação ou feedback:", error);
      showAlert(error.message || "Erro avaliação ou feedback.","error");
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedAvaliacao(null);
    setSelectedFeedback(null);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" sx={{ minHeight: "91vh", bgcolor: "#f9f9f9", padding: 3 }}>
      <TableContainer
        component={Paper}
        sx={{
          width: "70%",
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          height: "70vh",
          overflowY: "auto",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "darkblue", marginBottom: 3 }}
        >
          Avaliações Realizadas
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Tipo Prova</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Nível Apreciação</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Tipo Vinho</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Localização</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Duração Prova</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Feedback</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {configuracoes.map((config) => (
              <TableRow key={config._id}>
                <TableCell>{config.tipoProva}</TableCell>
                <TableCell>{config.nivelApreciacao}</TableCell>
                <TableCell>{config.tipoVinho}</TableCell>
                <TableCell>{config.localizacao}</TableCell>
                <TableCell>{config.duracaoProva}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleAvaliarClick(config._id)}>
                    <CommentIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <FeedbackDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        avaliacao={selectedAvaliacao}
        feedback={selectedFeedback}
      />
      <CustomAlert
        open={alert.open}
        message={alert.message}
        type={alert.type}
        onClose={handleCloseAlert}
      />
    </Box>
  );
};

export default Feedback;
