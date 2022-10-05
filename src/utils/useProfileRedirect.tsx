import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

function useProfileRedirect() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.log('useProfileRedirect.fired');

    if (isAuthenticated) {
      navigate('/profile');
    }
  });
}

export default useProfileRedirect;
