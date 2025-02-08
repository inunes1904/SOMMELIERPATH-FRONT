import { Grid, TextField } from "@mui/material";

const AvaliacaoForm = ({ register, errors }) => {
  const fields = [
    "pesoAroma",
    "pesoCor",
    "pesoSabor",
    "pesoCorpo",
    "pesoPersistencia",
  ];

  return (
    <Grid container spacing={3} paddingTop={2}>
      {fields.map((field, index) => (
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
  );
};

export default AvaliacaoForm;
