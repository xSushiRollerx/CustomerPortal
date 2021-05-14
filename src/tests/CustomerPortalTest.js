import { render, screen } from '@testing-library/react';
import CustomerPortal from '../components/CustomerPortal';
import { shallow } from 'enzyme';

test('renders without crashing', () => {
  render(<CustomerPortal />);
});

it('log out successfully', () => {
    //tbd
});