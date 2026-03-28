import { render, screen } from '@testing-library/react';
import App from './App';
import { AuthProvider } from './context/AuthContext';

test('renders Workout Tracker navbar', () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
  const navElement = screen.getByText(/Workout Tracker/i);
  expect(navElement).toBeInTheDocument();
});
