import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App Component', () => {
  it('renders Login component by default', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText(/login to schoolcloud/i)).toBeInTheDocument();
  });

  it('renders Register component on /register route', () => {
    window.history.pushState({}, '', '/register');
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText(/register for schoolcloud/i)).toBeInTheDocument();
  });
});