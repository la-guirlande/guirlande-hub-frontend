import { createContext, FC, useEffect, useState } from 'react';
import { useQuery } from '../hooks/query-hook';
import { Endpoint, UserResponse } from '../utils/api';
import { User } from '../utils/data';

/**
 * Authentication context props.
 */
interface AuthenticationContextProps {
  authUser: User;
  setAuthUser: (authUser: User) => void;
}

/**
 * Authentication context.
 * 
 * This context is used to store and share the authenticated user.
 */
export const AuthenticationContext = createContext<AuthenticationContextProps>({ authUser: null, setAuthUser: null });
AuthenticationContext.displayName = 'Authentication';

/**
 * Authentication context provider.
 */
export const AuthenticationContextProvider: FC = ({ children }) => {
  const [authUser, setAuthUser] = useState<User>(null);
  const userQuery = useQuery<UserResponse>({ auth: true, autoReconnect: false });

  useEffect(() => {
    userQuery.get(Endpoint.USERS_INFO)
      .then(res => setAuthUser(res.user))
      .catch(err => console.error('Could not authenticate :', err));
  }, []);

  return (
    <AuthenticationContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
