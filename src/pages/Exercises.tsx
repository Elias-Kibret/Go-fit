import { AddCircleOutline } from '@mui/icons-material';
import { Divider } from '@mui/material';
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
  console.log({ exercises });

  const [newExercise, setNewExercise] = useState(false);
  const [exercise, setExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    console.log('Exercises.useEfect.mount');
    exerciseStore().fetch();
  }, []);

  const showExercises = (exercises: Exercise[]) => {
    if (!exercises?.length) {
      return <Box>There are no exercises</Box>;
    }

    return (
      <Stack direction="column" gap={3} divider={<Divider orientation="horizontal" flexItem />}>
        {exercises.map((exercise) => (
          <Box onClick={() => setExercise(exercise)}>
            <ExerciseSummary exercise={exercise} />
          </Box>
        ))}
        ;
      </Stack>
    );
  };

  const showExerciseDetails = (exercise: Exercise | null) => {
    console.log({ exercise, newExercise });
    if (exercise || newExercise) return <ExerciseDetails exercise={exercise} />;
    return <Box>No exercise selected</Box>;
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 4fr ' }}>
      <ul>
        <h2>List of exercises/History/</h2>
        <Button
          variant="text"
          color="primary"
          startIcon={<AddCircleOutline />}
          onClick={() => {
            setNewExercise(true);
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
