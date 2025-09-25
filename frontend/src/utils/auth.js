import { jwtDecode } from 'jwt-decode';

export const getToken = () => localStorage.getItem('token');

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime; // Check if token is not expired
  } catch (err) {
    return false;
  }
};

export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.role;
  } catch (err) {
    return null;
  }
};

export const logout = (navigate) => {
  localStorage.removeItem('token');
  navigate('/login');
};