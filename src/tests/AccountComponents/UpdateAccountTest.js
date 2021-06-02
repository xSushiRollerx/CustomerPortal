import { render, screen } from '@testing-library/react';
import UpdateAccount from '../components/UpdateAccount';

test('renders without crashing', () => {
  render(<UpdateAccount />);
});

it('Sends request on valid inputs', ()=>{

});