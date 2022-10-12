/* eslint-disable no-constant-condition */
// import React from 'react';
// // import Exercises from './Exercises';

// function PreviousWorkout() {
//   //   const deleteWorkoutHandler = (userId, workoutId) => {
//   //     onDeleteWorkout(userId, workoutId);
//   //   };

//   //   const exercise = workout.slice(1).map((w, i) => {
//   //     return (
//   //   const exercise = Exercises.map((w, i) => {
//   //     return (
//   //       <div>
//   //         <p>
//   //           Exercise: <span>------</span>
//   //         </p>
//   //         <p>
//   //           Reps: <span>------</span>
//   //         </p>
//   //       </div>
//   //     );
//   //   });
//   return (
//     <div>
//       <h1>Date:----</h1>
//       {/* {exercise} */}
//       <button type="submit">Delete Workout</button>
//     </div>
//   );
// }

// export default PreviousWorkout;

import { Box } from '@mui/system';
import Loader from 'components/Loader';
import React from 'react';

function PreviousExercises() {
  if (false) return <Loader />;
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 4fr ', gap: '4' }}>
      <ul>
        <h2>List of Previous Exercises Completed</h2>
        <h3>Name:-----</h3>
        <h3>date: -----</h3>
        <h3>Exercise Type: -------</h3>
        <h3>Reps:------</h3>
        <h3>completed Time: ----</h3>
      </ul>
    </Box>
  );
}

export default PreviousExercises;
