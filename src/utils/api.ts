import { Error, User } from './data';

/**
 * API endpoints.
 */
export const Endpoint = {
  AUTH_REFRESH_TOKEN: `${process.env.REACT_APP_API_URL}/auth/refreshToken`,
  AUTH_ACCESS_TOKEN: `${process.env.REACT_APP_API_URL}/auth/accessToken`,
  USERS_INFO: `${process.env.REACT_APP_API_URL}/users/info`
}

/**
 * Base response.
 */
export interface Response {}

/**
 * Error response.
 * 
 * This response is returned when any API error occurs.
 */
export interface ErrorResponse extends Response {
  errors: Error[];
}

/**
 * Refresh token response.
 */
export interface RefreshTokenResponse extends Response {
  access_token: string;
  refresh_token: string;
}

/**
 * Access token response.
 */
export interface AccessTokenResponse extends RefreshTokenResponse {}

/**
 * Users response.
 */
export interface UsersResponse extends Response {
  users: User[];
}

/**
 * User response.
 */
export interface UserResponse extends Response {
  user: User;
}
