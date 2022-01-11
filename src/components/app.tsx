import { FC } from 'react';
import { AlertsContextProvider } from '../contexts/alerts-context';
import { AuthenticationContextProvider } from '../contexts/authentication-context';
import { AuthenticationContainer } from './authentication-container';

/**
 * Application component.
 */
export const App: FC = () => (
  <AlertsContextProvider>
    <AuthenticationContextProvider>
      <AuthenticationContainer />
    </AuthenticationContextProvider>
  </AlertsContextProvider>
);
