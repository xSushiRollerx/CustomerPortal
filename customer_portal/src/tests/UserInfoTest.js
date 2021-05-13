import { render, screen } from '@testing-library/react';
import UserInfo from '../components/UserInfo';

test('renders without crashing', () => {
  render(<UserInfo />);
});

it('Makes request on load when logged in', ()=>{

});