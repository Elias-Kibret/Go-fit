/* eslint-disable react/jsx-props-no-spreading */
import { AddCircleOutlineRounded } from '@mui/icons-material';
// import { styled } from '@mui/system';
import { Autocomplete, Box, Button, FormControl, IconButton, Stack, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import useAuth from 'utils/useAuth';
import { exerciseStore } from '../utils/firebase';
import { Exercise } from '../utils/type';
import useTimer from './useTimer';

function ExerciseDetails({ exercise }: { exercise: Exercise }) {
  const setOrReps = [1, 3, 5, 7, 9];

  const { user } = useAuth();

  const makeNewExercise = useCallback((uid: string = '') => {
    const result = {
      type: '',
      endTime: '',
      startTime: new Date().toISOString(),
      id: uid,
      reps: [],
      duration: null,
    };

    // console.log('calling makeNewExercise', result);
    return result;
  }, []);

  const isValidExercise = useCallback(
    (exercise: Exercise | {} | null) => exercise && Object.keys(makeNewExercise()).every((key) => key in exercise),
    [makeNewExercise],
  );

  const workoutOptions = ['', 'pull up', 'push bar', 'squats', 'abs', 'legs'];
  const [reps, setReps] = useState(0);
  const [exerciseData, setExerciseData] = useState<Exercise>(() =>
    isValidExercise(exercise) ? exercise : makeNewExercise(user?.uid),
  );
  const timer = useTimer();

  useEffect(() => {
    if (isValidExercise(exercise)) {
      setExerciseData(exercise);
    } else if (!isValidExercise(exercise)) {
      setExerciseData(makeNewExercise());
    }
  }, [exercise, isValidExercise, makeNewExercise]);

  const setExerciseField = (key: keyof Exercise, value: any) => {
    setExerciseData({ ...exerciseData, [key]: value });
  };

  const handleUpdateorCreate = (exercise: Exercise) => {
    const data = { ...exercise, duration: { ...timer.elapsedTime } };
    timer.reset();

    exerciseStore().createOrUpdate(data);
  };

  const resetExercise = () => setExerciseData(makeNewExercise());

  const makeSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('formSubmit.fired');

    return handleUpdateorCreate(exerciseData);
  };

  const getOperation = (exercise: Exercise) => (!exercise?.id?.length ? 'New' : 'Update');

  if (!exerciseData)
    return (
      <Box>
        <Box>Please select Exercise </Box>
      </Box>
    );

  return (
    <Box sx={{ padding: 10, 'background-color': '#e8fffa;', overflow: 'hidden' }}>
      <form className="flex-column padding " onSubmit={makeSubmitHandler}>
        <Stack spacing={5}>
          <h2>
            <span className="newExerciseTitle">{getOperation(exerciseData)}</span> Exercise{' '}
            <span className="ExerciseType">{exerciseData.type}</span>
          </h2>
          <FormControl fullWidth>
            <Autocomplete
              freeSolo
              id="exerciseTypeInput"
              disableClearable
              options={workoutOptions}
              selectOnFocus
              value={exerciseData?.type ?? ''}
              onChange={(event, newValue) => setExerciseField('type', newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  value={exerciseData?.type}
                  label="Type workout here"
                  onChange={(event) => setExerciseField('type', event.target.value)}
                />
              )}
            />
          </FormControl>

          <Box>
            <Box component="span" sx={{ display: 'block', 'margin-bottom': '40px' }}>
              <Button variant="text" color="primary" type="submit">
                {getOperation(exerciseData)}
              </Button>

              <Button variant="text" color="primary" onClick={() => timer.startOrPause()}>
                {timer.stateLabel}
              </Button>

              <Button variant="text" color="primary" onClick={() => timer.reset()}>
                reset
              </Button>
            </Box>
            <TextField
              id="elapsedTime"
              label={`Elapsed time ${timer.isRunning ? 'running' : 'stopped'}`}
              inputProps={{ style: { fontSize: 18 } }}
              InputLabelProps={{ style: { fontSize: 16 } }}
              value={`${timer.elapsedTime.value} ${timer.elapsedTime.timeUnit}`}
              color="primary"
              disabled
              size="small"
              sx={{ mb: '1.4rem' }}
            />

            <Autocomplete
              freeSolo
              id="exerciseRepsInput"
              disableClearable
              options={setOrReps}
              selectOnFocus
              value={exerciseData.type}
              sx={{ width: '150px', mb: '1.4rem' }}
              onChange={(event, newValue) => {
                if (!Number.isNaN(newValue)) setReps(Number(newValue));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Enter reps"
                  type="number"
                  onChange={(event) => event.target.value && setReps(parseInt(event.target.value, 10))}
                />
              )}
            />
            <TextField
              id="startTime"
              // label="Start Time"
              type="datetime-local"
              onChange={(event) => {
                const currentDateTime = new Date(event.target.value);
                console.table({ utc: currentDateTime.toUTCString(), iso: currentDateTime.toISOString() });
              }}
              sx={{ mb: '1.4rem' }}
            />
            <IconButton
              aria-label="add a rep to workout"
              onClick={() =>
                setExerciseField('reps', [
                  ...(exerciseData.reps || []),
                  { number: reps, startTime: new Date().toISOString() },
                ])
              }
            >
              <AddCircleOutlineRounded />
            </IconButton>
            <Box>
              <Button variant="outlined" color="primary" onClick={resetExercise}>
                reset
              </Button>
            </Box>
          </Box>

          {/* reps */}

          <Box>
            <ol>
              <Stack direction="column" rowGap={1}>
                {exerciseData.reps.map((_rep) => (
                  <li key={_rep?.startTime ?? new Date().toISOString()}>
                    {new Date(_rep.startTime).toLocaleDateString()} {_rep.number}
                  </li>
                ))}
              </Stack>
            </ol>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}

export default ExerciseDetails;
