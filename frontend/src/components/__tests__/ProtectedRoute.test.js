import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import { getToken, isAuthenticated } from '../../utils/auth';

jest.mock('../../utils/auth');

describe('ProtectedRoute Component', () => {
  it('renders children when authenticated', () => {
    getToken.mockReturnValue('valid_token');
    isAuthenticated.mockReturnValue(true);

    render(
      <BrowserRouter>
        <ProtectedRoute>
          <div>Test Content</div>
        </ProtectedRoute>
      </BrowserRouter>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('redirects to login when not authenticated', () => {
    getToken.mockReturnValue(null);
    isAuthenticated.mockReturnValue(false);

    render(
      <BrowserRouter>
        <ProtectedRoute>
          <div>Test Content</div>
        </ProtectedRoute>
      </BrowserRouter>
    );
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
    expect(window.location.pathname).toBe('/login');
  });
});