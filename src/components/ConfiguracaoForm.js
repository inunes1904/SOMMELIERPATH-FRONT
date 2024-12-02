import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Checkbox, FormControlLabel, Button, Grid, Card, CardContent, Typography, Box } from '@mui/material';

const ConfiguracaoForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      // Retrieve token from localStorage
      const token = localStorage.getItem('token');

      // Ensure the user is authenticated
      if (!token) {
        alert('Usuário não está autenticado.');
        return;
      }

      console.log('Sending data:', data);

      // Send data without userId (let backend handle userId from token)
      const response = await fetch('http://localhost:3000/api/v1/configuracao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`, // Token in Authorization header
        },
        body: JSON.stringify(data), // No userId here, it will be added by the backend
      });

      if (!response.ok) {
        // Log error details
        const errorDetails = response.headers.get('Content-Type')?.includes('application/json')
          ? await response.json()
          : await response.text();
        console.error('API Error:', response.status, errorDetails);
        alert(`Error: ${response.status} - ${errorDetails}`);
        return;
      }

      const result = await response.json();
      console.log('API Response:', result);
      alert('Configuração criada com sucesso!');
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Ocorreu um erro ao criar a configuração.');
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
        sx={{ color: 'darkblue', marginBottom: 4 }}
      >
        Criar Configuração de Degustação
      </Typography>

      <Card sx={{ width: '70%' }}>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>

              {/* Tipo de Prova */}
              <Grid item xs={12}>
                <TextField
                  label="Tipo de Prova"
                  variant="filled"
                  fullWidth
                  {...register('tipo_prova', { required: 'Tipo de Prova é obrigatório' })}
                  error={!!errors.tipo_prova}
                  helperText={errors.tipo_prova?.message}
                />
              </Grid>

              {/* Peso Aroma, Cor, Sabor, Corpo */}
              <Grid container item spacing={3}>
                <Grid item xs={3}>
                  <TextField
                    label="Peso Aroma"
                    type="number"
                    variant="filled"
                    fullWidth
                    {...register('peso_aroma', { required: 'Peso Aroma é obrigatório' })}
                    error={!!errors.peso_aroma}
                    helperText={errors.peso_aroma?.message}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Peso Cor"
                    type="number"
                    variant="filled"
                    fullWidth
                    {...register('peso_cor', { required: 'Peso Cor é obrigatório' })}
                    error={!!errors.peso_cor}
                    helperText={errors.peso_cor?.message}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Peso Sabor"
                    type="number"
                    variant="filled"
                    fullWidth
                    {...register('peso_sabor', { required: 'Peso Sabor é obrigatório' })}
                    error={!!errors.peso_sabor}
                    helperText={errors.peso_sabor?.message}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Peso Corpo"
                    type="number"
                    variant="filled"
                    fullWidth
                    {...register('peso_corpo', { required: 'Peso Corpo é obrigatório' })}
                    error={!!errors.peso_corpo}
                    helperText={errors.peso_corpo?.message}
                  />
                </Grid>
              </Grid>

              {/* Peso Persistência, Número de Participantes */}
              <Grid container item spacing={3}>
                <Grid item xs={3}>
                  <TextField
                    label="Peso Persistência"
                    type="number"
                    variant="filled"
                    fullWidth
                    {...register('peso_persistencia', { required: 'Peso Persistência é obrigatório' })}
                    error={!!errors.peso_persistencia}
                    helperText={errors.peso_persistencia?.message}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Número de Participantes"
                    type="number"
                    variant="filled"
                    fullWidth
                    {...register('numero_participantes', { required: 'Número de Participantes é obrigatório' })}
                    error={!!errors.numero_participantes}
                    helperText={errors.numero_participantes?.message}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={<Checkbox {...register('guias_degustacao')} />}
                    label="Guias de Degustação"
                  />
                  <FormControlLabel
                    control={<Checkbox {...register('dicas_temperatura')} />}
                    label="Dicas de Temperatura"
                  />
                  <FormControlLabel
                    control={<Checkbox {...register('sugestoes_acompanhamento')} />}
                    label="Sugestões de Acompanhamento"
                  />
                </Grid>
              </Grid>

              {/* Nível de Apreciação */}
              <Grid item xs={12}>
                <TextField
                  label="Nível de Apreciação"
                  variant="filled"
                  fullWidth
                  {...register('nivel_apreciacao', { required: 'Nível de Apreciação é obrigatório' })}
                  error={!!errors.nivel_apreciacao}
                  helperText={errors.nivel_apreciacao?.message}
                />
              </Grid>

              {/* Tipos de Vinho */}
              <Grid item xs={12}>
                <TextField
                  label="Tipos de Vinho"
                  variant="filled"
                  fullWidth
                  {...register('tipos_vinho', { required: 'Tipos de Vinho são obrigatórios' })}
                  error={!!errors.tipos_vinho}
                  helperText={errors.tipos_vinho?.message}
                />
              </Grid>

              {/* Métodos de Degustação */}
              <Grid item xs={12}>
                <TextField
                  label="Métodos de Degustação"
                  variant="filled"
                  fullWidth
                  {...register('metodos_degustacao', { required: 'Métodos de Degustação são obrigatórios' })}
                  error={!!errors.metodos_degustacao}
                  helperText={errors.metodos_degustacao?.message}
                />
              </Grid>

              {/* Duração da Prova */}
              <Grid item xs={12}>
                <TextField
                  label="Duração da Prova"
                  variant="filled"
                  fullWidth
                  {...register('duracao_prova', { required: 'Duração da Prova é obrigatória' })}
                  error={!!errors.duracao_prova}
                  helperText={errors.duracao_prova?.message}
                />
              </Grid>

              {/* Localização */}
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

              {/* Submit Button */}
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
    </Box>
  );
};

export default ConfiguracaoForm;
