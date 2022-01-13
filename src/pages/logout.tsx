import { FC, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthenticationContext } from '../contexts/authentication-context';
import { Key } from '../utils/local-storage';

/**
 * Logout page.
 * 
 * This page is only used to logs out the user. It redirect to the home page.
 */
export const LogoutPage: FC = () => {
  const { setAuthUser } = useContext(AuthenticationContext);

  useEffect(() => {
    localStorage.removeItem(Key.REFRESH_TOKEN);
    localStorage.removeItem(Key.ACCESS_TOKEN);
    setAuthUser(null);
  }, []);

  return (
    <Navigate to="/" replace />
  );
}
