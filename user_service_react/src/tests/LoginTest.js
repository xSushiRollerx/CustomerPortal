import { render, screen } from '@testing-library/react';
import Login from '../components/Login';

test('renders without crashing', () => {
  render(<Login />);
});