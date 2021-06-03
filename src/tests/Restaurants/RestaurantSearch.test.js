import React from 'react';
import { fireEvent, render, wait, waitFor, act } from '@testing-library/react';
import RestaurantSearch from './../../components/Restaurants/RestaurantSearch';
import { unmountComponentAtNode } from "react-dom";
import mockAxios from 'axios';

const mockRouterDOM = require("react-router-dom");
jest.mock("react-router-dom");

const result = [
    {
        "id": 2,
        "name": "French Bistro",
        "averageRating": 4.3,
        "tags": "French, Bakery",
        "isActive": 1,
        "priceCategory": 2,
        "streetAddress": "La Rue",
        "city": "Paris",
        "state": "BA",
        "zipCode": 44444,
        "menu": [
            {
                "id": 4,
                "restaurantID": 2,
                "name": "Croissant",
                "cost": 2.99,
                "summary": "good bread",
                "special": 0,
                "isActive": 1,
                "category": "Pan"
            },
            {
                "id": 5,
                "restaurantID": 2,
                "name": "Pan Francaise",
                "cost": 3.99,
                "summary": "good bread",
                "special": 0,
                "isActive": 1,
                "category": "Pan"
            }
        ],
        "relevance": 0,
        "resultSize": 26,
        "totalPages": 3
    },
    {
        "id": 3439,
        "name": "HelloWord",
        "averageRating": 2.6,
        "tags": "hello, hola, salut, bonjour",
        "isActive": 1,
        "priceCategory": 1,
        "streetAddress": "34 Hola",
        "city": "Hello",
        "state": "HW",
        "zipCode": 55555,
        "menu": [],
        "relevance": 0,
        "resultSize": 26,
        "totalPages": 3
    },
    {
        "id": 3440,
        "name": "HelloWord",
        "averageRating": 2.6,
        "tags": "hello, hola, salut, bonjour",
        "isActive": 1,
        "priceCategory": 1,
        "streetAddress": "34 Hola",
        "city": "Hello",
        "state": "HW",
        "zipCode": 55555,
        "menu": [],
        "relevance": 0,
        "resultSize": 26,
        "totalPages": 3
    }];
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

it("Use Effect Runs On Load", async () => {

    mockRouterDOM.useHistory = jest.fn(); 
    let calls = mockAxios.get.mockResolvedValue({
        data: result,
        status: 200
    });

    render(<RestaurantSearch />, container);

    await waitFor(() => {
        expect(calls.mock.calls.length).toBe(1);
    })
    
});

it("Search Creates API Call", async () => {

    mockRouterDOM.useHistory = jest.fn();
    let calls = mockAxios.get.mockResolvedValue({
        data: result,
        status: 200
    });

    const { getByTestId, findByTestId } = render(<RestaurantSearch />, container);

    expect(getByTestId("Waiting")).toBeInTheDocument();

    const searchBar = await findByTestId('searchBar');
    
    act(() => {
        fireEvent.change(searchBar, { target: { value: "hello" } });
        fireEvent.keyUp(container, { key: 'Enter', code: 'Enter' });
    });

    await waitFor(() => {
        expect(calls.mock.calls.length).toBe(2);
    }); 

});


