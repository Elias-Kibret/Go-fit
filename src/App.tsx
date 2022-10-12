import { User } from 'firebase/auth';
import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Exercises from './pages/Exercises';
import Home from './pages/Home';
import Layout from './pages/Layout';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import PreviousWork from './pages/PreviosWorkout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import useAuth from './utils/useAuth';

interface RouteConfig {
  element: React.ReactNode;
  path: string;
  authHandler: (auth: User | null) => boolean;
}

function ProtectedRoutes({ routes }: { routes: Array<RouteConfig> }) {
  const location = useLocation();
  const { authHandler = () => true } = routes.find(({ path }) => location.pathname.includes(path)) ?? {};
  const { user } = useAuth();

  if (!authHandler(user)) {
    // console.log('ProtectedRoutes.authHandler.fired', { user });
    return <Navigate to="/signin" />;
  }

  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route path={path} element={element} key={path} />
      ))}
    </Routes>
  );
}

function App() {
  const mustBeLoggedIn = (user: User | null) => Boolean(user);

  const routes: Array<RouteConfig> = [
    { path: 'profile', element: <Profile />, authHandler: mustBeLoggedIn },
    { path: 'exercises', element: <Exercises />, authHandler: mustBeLoggedIn },
    { path: 'previousWork', element: <PreviousWork />, authHandler: mustBeLoggedIn },
  ];
  return (
    <div className="bg-green-400">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="*" element={<ProtectedRoutes routes={routes} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
