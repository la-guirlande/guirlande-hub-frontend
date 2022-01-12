import { FC, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthenticationContext } from '../contexts/authentication-context';
import { DashboardPage } from '../pages/dashboard';
import { HomePage } from '../pages/home';

/**
 * Router component.
 * 
 * This component contains the application main routing system.
 */
export const Router: FC = () => {
  const { authUser } = useContext(AuthenticationContext);

  if (authUser) {
    return (
      <Routes>
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
