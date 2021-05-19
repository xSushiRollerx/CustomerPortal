import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import OrderCart from '../components/OrderCart';
import { unmountComponentAtNode } from "react-dom";

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

it("RestaurantProfile renders", () => {
    const { getByTestId } = render(<OrderCart />, container);
    expect(getByTestId('DropOffForm')).toBeInTheDocument();
});