import React from 'react';
import { fireEvent, render, wait, waitFor, act, getByTestId } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import mockAxios from 'axios';
import RestaurantProfile from '../../pages/RestaurantProfile';


const result = {
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
    };


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useParams: () => ({
        id: 27,
    })
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

it("Use Effect Runs On Load 200 Response", async () => {
    let calls = mockAxios.get.mockResolvedValue({
        data: result,
        status: 200
    });

   

    await act(async () => {
        render(<RestaurantProfile />, container);
    });
    expect(calls.mock.calls.length).toBe(1);
    
});

it("Use Effect Runs On Load 403 Response", async () => {
    let calls = mockAxios.get.mockResolvedValue({
        data: result,
        status: 403
    });

   
    let dom;
    await act(async () => {
        dom = render(<RestaurantProfile />, container);
    });
    expect(calls.mock.calls.length).toBe(1);
    expect(dom.getByTestId('error-text')).toBeTruthy();
    
});


it("add item to cart and is saved to local storage", async () => {
    let calls = mockAxios.get.mockResolvedValue({
        data: result,
        status: 200
    });
    localStorage.setItem('orders', '[]')

   
    let dom;
    await act(async () => {
        dom = render(<RestaurantProfile />, container);
    });

    console.log(container);

    await act(async () => {
        fireEvent.click(await dom.findByTestId('food-item-button-4'));
    });

    expect(dom.getByTestId("food-item-add-modal-4")).toBeTruthy();

    await act(async () => {
        fireEvent.change(await dom.findByTestId('food-item-add-field-'+ 4), {target: {value: 4}});
        fireEvent.click(await dom.findByTestId('food-item-add-item-button-4'));
    });

    expect(JSON.parse(localStorage.getItem('orders'))[0].orderItems[0].quantity).toBe(4);
    
});

it("Go back and add more items to the cart", async () => {
    let calls = mockAxios.get.mockResolvedValue({
        data: result,
        status: 200
    });
    localStorage.setItem('orders', '[]')

   
    let dom;
    await act(async () => {
        dom = render(<RestaurantProfile />, container);
    });

    console.log(container);

    await act(async () => {
        fireEvent.click(await dom.findByTestId('food-item-button-4'));
    });

    await act(async () => {
        fireEvent.change(await dom.findByTestId('food-item-add-field-'+ 4), {target: {value: 4}});
        fireEvent.click(await dom.findByTestId('food-item-add-item-button-4'));
    });

    expect(JSON.parse(localStorage.getItem('orders'))[0].orderItems[0].quantity).toBe(4);
    
    await act(async () => {
        fireEvent.click(await dom.findByTestId('food-item-button-4'));
    });

    await act(async () => {
        fireEvent.change(await dom.findByTestId('food-item-add-field-'+ 4), {target: {value: 2}});
        fireEvent.click(await dom.findByTestId('food-item-add-item-button-4'));
    });

    expect(JSON.parse(localStorage.getItem('orders'))[0].orderItems[0].quantity).toBe(6);
});




