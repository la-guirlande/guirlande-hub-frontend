/**
 * ID data.
 * 
 * Any data type that has an ID must implements this interface.
 */
export interface ID {
  id: string;
}

/**
 * Timestamps data.
 * 
 * Any data type that has timestamps (creation and update) must implements this interface.
 */
export interface Timestamps {
  createdAt: string;
  updatedAt: string;
}

/**
 * Error data.
 */
export interface Error {
  error: string;
  error_description: string;
}

/**
 * User data.
 */
export interface User extends ID, Timestamps {
  email: string;
  name: string;
}
