import { shallowEqual } from 'react-redux';
import { useAppSelector } from './reduxHooks';

function useAuth() {
  return useAppSelector((state) => state.user, shallowEqual);
}

export default useAuth;
