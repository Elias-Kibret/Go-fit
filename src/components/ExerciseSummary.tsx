/* eslint-disable prettier/prettier */
import React from 'react';
import { RemoveCircleOutlined } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { exerciseStore } from '../utils/firebase';
import { Exercise } from '../utils/type';

function ExerciseSummary({ exercise }: { exercise: Exercise }) {
  return (
    <Grid container>
      <Grid item xs={6}>
        <strong>{exercise.type}</strong>
      </Grid>
      <Grid item xs={6}>
        Duration
      </Grid>
      <Grid item xs={12}>
        Date
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="warning"
          startIcon={<RemoveCircleOutlined />}
          onClick={() => exerciseStore().remove(exercise)}
        >
          Delete
        </Button>
      </Grid>
    </Grid>
  );
}

export default ExerciseSummary;
