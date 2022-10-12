import React from 'react';
import { RemoveCircleOutlined } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { exerciseStore } from '../utils/firebase';
import { Exercise } from '../utils/type';

const days = ['sun', 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat'];

function ExerciseSummary({ exercise, onClick }: { exercise: Exercise; onClick: () => void }) {
  const exerciseDate = new Date(exercise.startTime);

  return (
    <Grid container sx={{ rowGap: 3 }}>
      <Grid item xs={6}>
        <strong>{exercise.type}</strong>
      </Grid>
      <Grid item xs={6}>
        Duration {`${exercise?.duration?.value} ${exercise?.duration?.timeUnit}`}
      </Grid>
      <Grid item xs={12}>
        Date {exerciseDate.toLocaleString()} {days[exerciseDate.getDay()]}
      </Grid>
      <Grid item xs={12} display="flex" columnGap={1}>
        <Button variant="outlined" color="primary" onClick={onClick}>
          Details
        </Button>
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
