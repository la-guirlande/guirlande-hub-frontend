import { createContext, FC, useState } from 'react';
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
  return (
    <AuthenticationContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
