import { render, screen } from '@testing-library/react';
import Register from '../components/Register';

test('renders without crashing', () => {
  render(<Register />);
});

it('Makes axios request on correct inputs',()=>{

});