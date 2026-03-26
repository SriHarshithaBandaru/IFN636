import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Workout Tracker navbar', () => {
  render(<App />);
  const navElement = screen.getByText(/Workout Tracker/i);
  expect(navElement).toBeInTheDocument();
});
