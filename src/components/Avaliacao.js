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
  TextField,
  Grid,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useForm } from "react-hook-form";
import CustomAlert from "./CustomAlert";

const Avaliacao = () => {
  const [configuracoes, setConfiguracoes] = useState([]);
  const [avaliacoesByTheUser, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedConfiguracaoId, setSelectedConfiguracaoId] = useState(null);
  const [alert, setAlert] = useState({ open: false, message: "", type: "" });

  const showAlert = (message, type) => {
    setAlert({ open: true, message, type });
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

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

      const unfinishedConfiguracoes = configuracoesResp.data.filter(
        (config) =>
          config.finalizado === "false" &&
          !avaliacoes.some((avaliacao) => avaliacao.configuracaoId === config._id)
      );

      setAvaliacoes(avaliacoes);
      setConfiguracoes(unfinishedConfiguracoes);
    } catch (error) {
      console.error("Error fetching data:", error);
      showAlert(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAvaliarClick = (id) => {
    setSelectedConfiguracaoId(id);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedConfiguracaoId(null);
  };

  const AvaliacaoDialog = ({ open, onClose, configuracaoId, fetchData, showParentAlert }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          showParentAlert("User não autenticado.", "error");
          return;
        }
        // REMOTE
        const response = await fetch("https://sommelierpath-2.onrender.com/api/v1/avaliacao", {
        // LOCAL
        // const response = await fetch("http://localhost:3000/api/v1/avaliacao", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...data, configuracaoId }),
        });

        if (!response.ok) {
          throw new Error("Erro ao criar avaliação.");
        }
        showParentAlert("Avaliação criada com sucesso!", "success");
        onClose();
        fetchData(); // Update the data
      } catch (error) {
        console.error("Erro ao criar avaliação:", error);
        showParentAlert("Erro ao criar avaliação.", "error");
      }
    };

    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle align={"center"}>Avaliar Prova</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} paddingTop={2}>
              {["pesoAroma", "pesoCor", "pesoSabor", "pesoCorpo", "pesoPersistencia"].map((field, index) => (
                <Grid item xs={12} key={index}>
                  <TextField
                    label={field.replace("peso", "Peso ")}
                    type="number"
                    fullWidth
                    {...register(field, { required: `${field} é obrigatório` })}
                    error={!!errors[field]}
                    helperText={errors[field]?.message}
                  />
                </Grid>
              ))}
            </Grid>
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Enviar Avaliação
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">Cancelar</Button>
        </DialogActions>
      </Dialog>
    );
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
          Avaliações a Decorrer
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Tipo Prova</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Nível Apreciação</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Tipo Vinho</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Localização</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Duração Prova</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Avaliar</TableCell>
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
                    <StarIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AvaliacaoDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        configuracaoId={selectedConfiguracaoId}
        fetchData={fetchData}
        showParentAlert={showAlert}
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

export default Avaliacao;
