import React from 'react';
import { MdSportsKabaddi } from 'react-icons/md';
import styled from 'styled-components';
import { BiTimer } from 'react-icons/bi';
import { RemoveCircleOutlined } from '@mui/icons-material';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import { exerciseStore } from '../utils/firebase';
import { Exercise } from '../utils/type';

const days = ['sun', 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat'];
const DateWrapper = styled.span`
  font-size: 14px;
`;
function ExerciseSummary({ exercise, onClick }: { exercise: Exercise; onClick: () => void }) {
  const exerciseDate = new Date(exercise.startTime);

  return (
    <Grid container sx={{ rowGap: 3 }}>
      <Box
        sx={{
          padding: 3,
          'background-color': '#e8fffa;',
          overflow: 'hidden',
          border: '1px solid #c4ebe3',
          borderRadius: '8px',
        }}
      >
        <Grid item xs={15} sx={{ display: 'flex', 'align-items': 'center', mb: '8px' }}>
          <MdSportsKabaddi style={{ color: '#1976d2', marginRight: '12px' }} />
          <span>{exercise.type}</span>
        </Grid>
        <Grid item xs={15} sx={{ display: 'flex', 'align-items': 'center', mb: '8px' }}>
          <BiTimer style={{ color: '#1976d2', marginRight: '12px' }} />
          {`${exercise?.duration?.value} ${exercise?.duration?.timeUnit}`}
        </Grid>
        <Grid item xs={15} sx={{ display: 'flex', 'align-items': 'center', mb: '8px' }}>
          <BsFillCalendarDateFill style={{ color: '#1976d2', marginRight: '12px' }} />
          <DateWrapper>
            {exerciseDate.toLocaleString()} {days[exerciseDate.getDay()]}
          </DateWrapper>
        </Grid>
      </Box>
      <Grid item xs={12} display="flex" sx={{ my: '1rem' }} columnGap={1}>
        <Button variant="outlined" color="primary" onClick={onClick}>
          Details
        </Button>
        <Button
          variant="contained"
          color="warning"
          startIcon={<RemoveCircleOutlined />}
          onClick={() => exerciseStore().remove(exercise)}
          sx={{ ml: '3rem' }}
        >
          Delete
        </Button>
      </Grid>
    </Grid>
  );
}

export default ExerciseSummary;
