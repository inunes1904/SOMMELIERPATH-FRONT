import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import AvaliacaoForm from "./AvaliacaoForm";

const AvaliacaoDialog = ({ open, onClose, configuracaoId, showParentAlert, refetchData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (!token) {
        showParentAlert("User não autenticado.", "error");
        return;
      }
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/avaliacao`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...data, configuracaoId, userId }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar avaliação.");
      }
      showParentAlert("Avaliação criada com sucesso!", "success");
      onClose();
      refetchData(); // Refresh the data
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
          <AvaliacaoForm register={register} errors={errors} />
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

export default AvaliacaoDialog;
