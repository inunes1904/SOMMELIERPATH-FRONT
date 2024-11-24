import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Checkbox, FormControlLabel, Button, Grid, Box } from '@mui/material';

const ConfiguracaoForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Handle form submission
  };

  return (
    <div className="form-container">
      <h1>Criar Configuração de Degustação</h1>

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
    </div>
  );
};

export default ConfiguracaoForm;
