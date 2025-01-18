import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Checkbox, FormControlLabel, Button, Grid, Card, CardContent, Typography, Box } from '@mui/material';
import CustomAlert from "./CustomAlert";

// Observer Pattern: AlertSubject and AlertObserver
class AlertSubject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class AlertObserver {
  constructor(updateCallback) {
    this.update = updateCallback;
  }
}

const alertSubject = new AlertSubject();

const ConfiguracaoForm = () => {
  const [alert, setAlert] = useState({ open: false, message: "", type: "" });

  const showAlert = (message, type) => {
    alertSubject.notify({ open: true, message, type });
  };

  useEffect(() => {
    const alertObserver = new AlertObserver((data) => {
      setAlert(data);
    });

    alertSubject.subscribe(alertObserver);

    // Cleanup on unmount
    return () => alertSubject.unsubscribe(alertObserver);
  }, []);

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        showAlert('User não está autenticado.', "error");
        return;
      }

      console.log('Sending data:', data);
      // LOCAL
      // const response = await fetch('http://localhost:3000/api/v1/deploy-atividade', {
      // REMOTE
      const response = await fetch('https://sommelierpath-2.onrender.com/api/v1/deploy-atividade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorDetails = response.headers.get('Content-Type')?.includes('application/json')
          ? await response.json()
          : await response.text();
        console.error('API Error:', response.status, errorDetails);
        showAlert(`Error: ${response.status} - ${errorDetails}`, "error");
        return;
      }

      const result = await response.json();
      console.log('API Response:', result);
      showAlert('Configuração criada com sucesso!', "success");

      // Reset the form after successful submission
      reset();
    } catch (error) {
      console.error('Fetch error:', error);
      showAlert('Ocorreu um erro ao criar a configuração.', 'error');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ minHeight: '100vh', bgcolor: '#f9f9f9', padding: 3 }}
    >
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        sx={{ color: 'darkblue', marginBottom: 4, marginTop: 4 }}
      >
        Criar Configuração de Degustação
      </Typography>

      <Card sx={{ width: '70%' }}>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={8}>
                <TextField
                  label="Nome da Prova"
                  variant="filled"
                  fullWidth
                  {...register('nomeProva', { required: 'Tipo de Prova é obrigatório' })}
                  error={!!errors.nomeProva}
                  helperText={errors.nomeProva?.message}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Tipo de Prova"
                  variant="filled"
                  fullWidth
                  {...register('tipoProva', { required: 'Tipo de Prova é obrigatório' })}
                  error={!!errors.tipoProva}
                  helperText={errors.tipoProva?.message}
                />
              </Grid>

              <Grid container item spacing={3}>
                <Grid item xs={3}>
                  <TextField
                    label="Peso Aroma"
                    type="number"
                    variant="filled"
                    fullWidth
                    {...register('pesoAroma', { required: 'Peso Aroma é obrigatório' })}
                    error={!!errors.pesoAroma}
                    helperText={errors.pesoAroma?.message}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Peso Cor"
                    type="number"
                    variant="filled"
                    fullWidth
                    {...register('pesoCor', { required: 'Peso Cor é obrigatório' })}
                    error={!!errors.pesoCor}
                    helperText={errors.pesoCor?.message}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Peso Sabor"
                    type="number"
                    variant="filled"
                    fullWidth
                    {...register('pesoSabor', { required: 'Peso Sabor é obrigatório' })}
                    error={!!errors.pesoSabor}
                    helperText={errors.pesoSabor?.message}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Peso Corpo"
                    type="number"
                    variant="filled"
                    fullWidth
                    {...register('pesoCorpo', { required: 'Peso Corpo é obrigatório' })}
                    error={!!errors.pesoCorpo}
                    helperText={errors.pesoCorpo?.message}
                  />
                </Grid>
              </Grid>

              <Grid container item spacing={3}>
                <Grid item xs={3}>
                  <TextField
                    label="Peso Persistência"
                    type="number"
                    variant="filled"
                    fullWidth
                    {...register('pesoPersistencia', { required: 'Peso Persistência é obrigatório' })}
                    error={!!errors.pesoPersistencia}
                    helperText={errors.pesoPersistencia?.message}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Número de Participantes"
                    type="number"
                    variant="filled"
                    fullWidth
                    {...register('numeroParticipantes', { required: 'Número de Participantes é obrigatório' })}
                    error={!!errors.numeroParticipantes}
                    helperText={errors.numeroParticipantes?.message}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={<Checkbox {...register('guiasDegustacao')} />}
                    label="Guias de Degustação"
                  />
                  <FormControlLabel
                    control={<Checkbox {...register('dicasTemperatura')} />}
                    label="Dicas de Temperatura"
                  />
                  <FormControlLabel
                    control={<Checkbox {...register('sugestoesAcompanhamento')} />}
                    label="Sugestões de Acompanhamento"
                  />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Nível de Apreciação"
                  variant="filled"
                  fullWidth
                  {...register('nivelApreciacao', { required: 'Nível de Apreciação é obrigatório' })}
                  error={!!errors.nivelApreciacao}
                  helperText={errors.nivelApreciacao?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Tipo do Vinho"
                  variant="filled"
                  fullWidth
                  {...register('tipoVinho', { required: 'Tipos de Vinho são obrigatórios' })}
                  error={!!errors.tipoVinho}
                  helperText={errors.tipoVinho?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Métodos de Degustação"
                  variant="filled"
                  fullWidth
                  {...register('metodosDegustacao', { required: 'Métodos de Degustação são obrigatórios' })}
                  error={!!errors.metodosDegustacao}
                  helperText={errors.metodosDegustacao?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Duração da Prova"
                  variant="filled"
                  fullWidth
                  {...register('duracaoProva', { required: 'Duração da Prova é obrigatória' })}
                  error={!!errors.duracaoProva}
                  helperText={errors.duracaoProva?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Localização"
                  variant="filled"
                  fullWidth
                  {...register('localizacao', { required: 'Localização é obrigatória' })}
                  error={!!errors.localizacao}
                  helperText={errors.localizacao?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={Object.keys(errors).length > 0}
                >
                  Criar Configuração
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <CustomAlert
        open={alert.open}
        message={alert.message}
        type={alert.type}
        onClose={handleCloseAlert}
      />
    </Box>
  );
};

export default ConfiguracaoForm;
