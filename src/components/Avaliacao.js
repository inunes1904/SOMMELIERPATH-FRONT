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
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const Avaliacao = () => {
  const [configuracoes, setConfiguracoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfiguracoes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/configuracao", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const unfinishedConfiguracoes = response.data.filter(
          (config) => config.finalizado === false
        );
        setConfiguracoes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching configuracoes:", error);
        setLoading(false);
      }
    };

    fetchConfiguracoes();
  }, []);

  const handleAvaliarClick = (id) => {
    console.log("Avaliar clicked for configuracao ID:", id);
    // Add navigation or evaluation logic here.
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{ minHeight: "100vh", bgcolor: "#f9f9f9", padding: 3 }}
    >
      <TableContainer
        component={Paper}
        sx={{
          width: "70%",
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
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
                  <IconButton
                    color="primary"
                    onClick={() => handleAvaliarClick(config._id)}
                  >
                    <StarIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Avaliacao;
