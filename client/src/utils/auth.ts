// File: /client/src/utils/auth.ts

// Get token from localStorage
export const getToken = (): string | null => {
  return localStorage.getItem('id_token');
};

// Check if the user is logged in (token exists)
export const loggedIn = (): boolean => {
  return !!getToken();
};

// Remove token and redirect to home
export const logout = (): void => {
  localStorage.removeItem('id_token');
  window.location.assign('/');
};

export const login = (token: string): void => {
  localStorage.setItem('id_token', token);
};