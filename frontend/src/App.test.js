import { render, screen } from '@testing-library/react';
import App from './App';
import { AuthProvider } from './context/AuthContext';

test('renders Workout Tracker navbar', () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
  const navElement = screen.getByText((content, element) =>
    element.tagName.toLowerCase() === 'span' &&
    /workouttracker/i.test(element.textContent.replace(/\s/g, ''))
  );
  expect(navElement).toBeInTheDocument();
});
