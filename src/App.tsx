import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Exercises from './pages/Exercises';
import Home from './pages/Home';
import Layout from './pages/Layout';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Unauthorized from './pages/Unauthorized';
import { AuthenticatedUser } from './store/userSlice';
import useAuth from './utils/useAuth';
interface RouteConfig {
  element: React.ReactNode;
  path: string;
  authHandler: (auth: AuthenticatedUser | null) => boolean;
}

function ProtectedRoutes({ routes }: { routes: Array<RouteConfig> }) {
  /** if current route is in routes, check authorization,
   * nav to Unauthorized if fails
   */
  const navigate = useNavigate();
  /** Guard */
  const location = useLocation();

  const { authHandler = () => true } = routes.find(({ path }) => location.pathname.includes(path)) ?? {};

  const user = useAuth();

  useEffect(() => {
    console.log('check user signed in', { authorizd: authHandler(user), authHandler });

    if (authHandler(user) === false) {
      // navigate the user out
      console.log('jumb to unauthorized');
      navigate('/signin');
    }
  }, [user, navigate, authHandler]);

  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route path={path} element={element} key={path} />
      ))}
    </Routes>
  );
}

function App() {
  const mustBeLoggedIn = (auth: AuthenticatedUser | null) => Boolean(auth?.isAuthenticated);

  const routes: Array<RouteConfig> = [
    { path: 'profile', element: <Profile />, authHandler: mustBeLoggedIn },
    { path: 'exercises', element: <Exercises />, authHandler: mustBeLoggedIn },
  ];
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />

        <Route path="*" element={<ProtectedRoutes routes={routes} />} />

        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
