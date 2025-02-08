import React, { useState } from "react";
import { Box, CircularProgress, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import useFetchData from "./hooks/useFetchData";
import AvaliacaoDialog from "./AvaliacaoDialog";
import CustomAlert from "./CustomAlert";

const Avaliacao = () => {
  console.log(process.env.REACT_APP_API_BASE_URL);
  const { configuracoes, loading, alert, showAlert, refetchData, closeAlert } = useFetchData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedConfiguracaoId, setSelectedConfiguracaoId] = useState(null);

  const handleAvaliarClick = (id) => {
    setSelectedConfiguracaoId(id);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedConfiguracaoId(null);
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
        showParentAlert={showAlert}
        refetchData={refetchData} // Pass refetchData here
      />
      <CustomAlert
        open={alert.open}
        message={alert.message}
        type={alert.type}
        onClose={() => closeAlert()} // Close the alert when it's dismissed
      />
    </Box>
  );
};

export default Avaliacao;
