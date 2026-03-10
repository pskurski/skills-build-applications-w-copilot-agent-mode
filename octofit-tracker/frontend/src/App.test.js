import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders octofit navigation', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const heading = screen.getByText(/octofit tracker/i);
  expect(heading).toBeInTheDocument();
});
