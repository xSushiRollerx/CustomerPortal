import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import RestaurantProfile from '../../components/Restaurants/RestaurantProfile';

let container = null;
beforeEach(() => {
 
    localStorage.setItem('orders', '[]');

    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

xit("RestaurantProfile renders", () => {
    let match = {
        'params': {'id': 2}
    }
    const { getByTestId } = render(<RestaurantProfile match={match}/>, container);
    expect(getByTestId('RestaurantProfile')).toBeInTheDocument();
});