import React from 'react';
import { fireEvent, render, wait, waitFor, act } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import mockAxios from 'axios';
import UserOrders from '../../components/AccountComponents/UserOrders';


const result = [
    {
        "id": 89,
        "state": 0,
        "customerId": 96,
        "refunded": null,
        "dateSubmitted": null,
        "orderItems": [
            {
                "id": 175,
                "foodId": 1,
                "quantity": 2,
                "price": 3.99,
                "name": "Miso Soup",
                "restaurantId": null
            },
            {
                "id": 176,
                "foodId": 2,
                "quantity": 4,
                "price": 6.99,
                "name": "California Roll",
                "restaurantId": null
            }
        ],
        "address": {
            "id": null,
            "street": "XXXX YOLO",
            "city": "nowhere",
            "state": "KN",
            "zipCode": 66666,
            "deliveryTime": null
        },
        "stripe": null,
        "restaurant": {
            "id": 1,
            "name": "Kyoto Sushi"
        },
        "numberOfOrders": 83
    },
    {
        "id": 88,
        "state": 0,
        "customerId": 96,
        "refunded": null,
        "dateSubmitted": null,
        "orderItems": [
            {
                "id": 173,
                "foodId": 1,
                "quantity": 2,
                "price": 3.99,
                "name": "Miso Soup",
                "restaurantId": null
            },
            {
                "id": 174,
                "foodId": 2,
                "quantity": 4,
                "price": 6.99,
                "name": "California Roll",
                "restaurantId": null
            }
        ],
        "address": {
            "id": null,
            "street": "XXXX YOLO",
            "city": "nowhere",
            "state": "KN",
            "zipCode": 66666,
            "deliveryTime": null
        },
        "stripe": null,
        "restaurant": {
            "id": 1,
            "name": "Kyoto Sushi"
        },
        "numberOfOrders": 83
    },
    {
        "id": 87,
        "state": 0,
        "customerId": 96,
        "refunded": null,
        "dateSubmitted": null,
        "orderItems": [
            {
                "id": 171,
                "foodId": 1,
                "quantity": 2,
                "price": 3.99,
                "name": "Miso Soup",
                "restaurantId": null
            },
            {
                "id": 172,
                "foodId": 2,
                "quantity": 4,
                "price": 6.99,
                "name": "California Roll",
                "restaurantId": null
            }
        ],
        "address": {
            "id": null,
            "street": "XXXX YOLO",
            "city": "nowhere",
            "state": "KN",
            "zipCode": 66666,
            "deliveryTime": null
        },
        "stripe": null,
        "restaurant": {
            "id": 1,
            "name": "Kyoto Sushi"
        },
        "numberOfOrders": 83
    },
    {
        "id": 86,
        "state": 0,
        "customerId": 96,
        "refunded": null,
        "dateSubmitted": null,
        "orderItems": [
            {
                "id": 169,
                "foodId": 4,
                "quantity": 2,
                "price": 2.99,
                "name": "Croissant",
                "restaurantId": null
            },
            {
                "id": 170,
                "foodId": 5,
                "quantity": 4,
                "price": 4.99,
                "name": "Pan Francaise",
                "restaurantId": null
            }
        ],
        "address": {
            "id": null,
            "street": "XXXX YOLO",
            "city": "nowhere",
            "state": "KN",
            "zipCode": 66666,
            "deliveryTime": null
        },
        "stripe": null,
        "restaurant": {
            "id": 2,
            "name": "French Bistro"
        },
        "numberOfOrders": 83
    }
      ];


let container = null;

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: jest.fn(),
        location: []
    }),
}));

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
    let calls = mockAxios.get.mockResolvedValue({
        data: result,
        status: 200
    });

   

    await act(async () => {
        render(<UserOrders   />, container);
    });
    expect(calls.mock.calls.length).toBe(1);
    
});

it("Page Turn", async () => {
    let calls = mockAxios.get.mockResolvedValue({
        data: result,
        status: 200
    });


    
   let dom;
   await act(async () => {
        dom = render(<UserOrders />, container);
    });

    expect(calls.mock.calls.length).toBe(1);

    await act(async () => {
        fireEvent.click(dom.getByTestId('previousPageBtn'));
    });

    expect(calls.mock.calls.length).toBe(2);

    await act(async () => {
        fireEvent.click(dom.getByTestId('firstPageBtn'));
    });

    expect(calls.mock.calls.length).toBe(3);

    await act(async () => {
        fireEvent.click(dom.getByTestId('nextPageBtn'));
    });

    expect(calls.mock.calls.length).toBe(4);

    await act(async () => {
        fireEvent.click(dom.getByTestId('lastPageBtn'));
    });
    expect(calls.mock.calls.length).toBe(5);
});
