import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Exercise } from '../utils/type';
import { exerciseStore } from '../utils/firebase';

function ExerciseDetails({ exercise }: { exercise: Exercise | null }) {
  const templateExercise: Exercise = {
    type: '',
    endTime: '',
    startTime: '',
    id: null,
    reps: [],
  };
  const workoutOptions = ['', 'pull up', 'push bar', 'squats', 'abs', 'legs'];
  const [exerciseData, setExerciseData] = useState(() => exercise || templateExercise);

  useEffect(() => {
    setExerciseData((prevEx) => exercise || prevEx);
  }, [exercise]);

  const showWorkoutOptions = (workoutOptions: Array<number | string>) =>
    workoutOptions.map((workout) => (
      <MenuItem value={workout} key={workout}>
        {workout}
      </MenuItem>
    ));

  const makeChangeHandler = (event: SelectChangeEvent) => {
    setExerciseData({ ...exerciseData, type: `${event.target.value}` });
  };

  const handleUpdateorCreate = (exercise: Exercise) => {
    exerciseStore().createOrUpdate(exercise);
  };

  const makeSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('formSubmit.fired');

    return handleUpdateorCreate(exerciseData);
  };

  const getOperation = (exercise: Exercise) => (!exercise?.id?.length ? 'New' : 'Update');
  if (!exerciseData) return <Box>No Exercise</Box>;
  return (
    <Box sx={{ padding: 10 }}>
      <form className="flex-column padding " onSubmit={makeSubmitHandler}>
        <Stack spacing={5}>
          <h2>{getOperation(exerciseData)} Exercise</h2>
          <FormControl fullWidth>
            <InputLabel id="exerciseTypeSelect">Exercise Type</InputLabel>
            <Select
              id="exerciseTypeSelect"
              label="Exercise type"
              value={exerciseData.type}
              onChange={makeChangeHandler}
              required
            >
              {showWorkoutOptions(workoutOptions)}
            </Select>
          </FormControl>
          <Box>
            <Button variant="text" color="primary" type="submit">
              {getOperation(exerciseData)}
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}

export default ExerciseDetails;
