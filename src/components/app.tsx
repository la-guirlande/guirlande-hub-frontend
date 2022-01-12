import { FC } from 'react';
import { AlertsContextProvider } from '../contexts/alerts-context';
import { AuthenticationContextProvider } from '../contexts/authentication-context';
import { Router } from './router';

/**
 * Application component.
 */
export const App: FC = () => (
  <AlertsContextProvider>
    <AuthenticationContextProvider>
      <Router />
    </AuthenticationContextProvider>
  </AlertsContextProvider>
);
