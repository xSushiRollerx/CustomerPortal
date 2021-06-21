import React from 'react';
import { render } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import  App from './App';

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: jest.fn(),
        location: []
    }),
}));

let container = null;

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    jest.resetAllMocks();
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});


it('renders without crashing', () => {
    render(<App />, container);
});