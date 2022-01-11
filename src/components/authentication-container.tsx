import { FC, useContext } from 'react';
import { AuthenticationContext } from '../contexts/authentication-context';
import { useAlerts } from '../hooks/alerts-hook';
import { Status, useQuery } from '../hooks/query-hook';
import { Endpoint, ErrorResponse, RefreshTokenResponse, UserResponse } from '../utils/api';
import { Key } from '../utils/local-storage';
import { Alert } from './base/alert';
import { LoginForm, LoginFormData } from './login-form';

/**
 * Authentication container.
 */
export const AuthenticationContainer: FC = () => {
  const { setAuthUser } = useContext(AuthenticationContext);
  const refreshTokenQuery = useQuery<RefreshTokenResponse>();
  const userQuery = useQuery<UserResponse>();
  const alerts = useAlerts();

  const handleLogin = async ({ email, password }: LoginFormData) => {
    try {
      const tokenRes = await refreshTokenQuery.post(Endpoint.AUTH_REFRESH_TOKEN, { email, password });
      localStorage.setItem(Key.REFRESH_TOKEN, tokenRes.refresh_token);
      localStorage.setItem(Key.ACCESS_TOKEN, tokenRes.access_token);
      const userRes = await userQuery.get(Endpoint.USERS_INFO, { headers: { Authorization: `Bearer ${tokenRes.access_token}` } });
      setAuthUser(userRes.user);
    } catch(err) {
      alerts.push(
        <Alert header="Could not login" timeout={10000}>
          <ul>
            {(err as ErrorResponse).errors.map((error, i) => (
              <li key={i}>[{error.error}] {error.error_description}</li>
            ))}
          </ul>
        </Alert>
      );
    }
  }
  
  return (
    <div className="m-5 w-1/2">
      <LoginForm loading={refreshTokenQuery.status === Status.IN_PROGRESS} onSubmit={handleLogin} />
    </div>
  );
}
