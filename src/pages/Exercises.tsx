import { AddCircleOutline } from '@mui/icons-material';
import { Divider, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { Box, Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import ExerciseSummary from '../components/ExerciseSummary';
import ExerciseDetails from '../components/ExerciseDetails';
import { Exercise } from '../utils/type';
import { exerciseStore } from '../utils/firebase';

function Exercises() {
  const { exercises } = useSelector((state: RootState) => state);
  const [exercise, setExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    exerciseStore().fetch();
  }, []);

  const showExercises = (exercises: Exercise[]) => {
    if (!exercises?.length) {
      return <Box>There are no exercises</Box>;
    }

    return (
      <Stack direction="column" gap={3} divider={<Divider orientation="horizontal" flexItem />}>
        {exercises.map((exercise) => (
          <Box key={exercise.id}>
            <ExerciseSummary onClick={() => setExercise(exercise)} exercise={exercise} />
          </Box>
        ))}
        ;
      </Stack>
    );
  };

  const showExerciseDetails = (exercise: Exercise | null) => {
    if (!exercise) {
      return (
        <Grid container sx={{ 'justify-content': 'center' }}>
          <Grid item xs={4} sx={{ margin: 'auto', fontSize: 'h3.fontSize' }}>
            No exercise selected
          </Grid>
        </Grid>
      );
    }
    return <ExerciseDetails exercise={exercise} />;
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 4fr ', gap: '4' }}>
      <ul>
        <h2>List of Exercises</h2>
        <Button
          variant="text"
          color="primary"
          startIcon={<AddCircleOutline />}
          onClick={() => {
            setExercise({} as any as Exercise);
          }}
        >
          New Exercise
        </Button>
        {showExercises(exercises)}
      </ul>
      {showExerciseDetails(exercise)}
    </Box>
  );
}

export default Exercises;
