import { FC, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthenticationContext } from '../contexts/authentication-context';
import { DashboardPage } from '../pages/dashboard/dashboard';
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
        <Route index element={<h1>Home</h1>} />
        <Route path="dashboard/*" element={<DashboardPage />} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="*" element={<h1>Not found</h1>} />
    </Routes>
  );
}
