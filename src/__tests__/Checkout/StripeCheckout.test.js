import React from 'react';
import { fireEvent, render, wait, waitFor, act, getByTestId } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import mockAxios from 'axios';
import StripeCheckout from '../../pages/StripeCheckout';
import { Elements, } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ExpansionPanelActions } from '@material-ui/core';

let container = null;
  

beforeEach(() => {
    const order  =  [
        {
            'name': 'Tokyo Sushi',
            'restaurantId': 1,
            'address': {
                'city': 'nowhere',
                'id': null,
                'state': 'KN',
                'street': 'XXXX YOLO',
                'zipCode': 66666
            },
            'customerId': 96,
            'id': null,
            'orderItems': [
                {
                    'foodId': 1,
                    'id': null,
                    'isActive': 1,
                    'name': "Miso Soup",
                    'price': 3.99,
                    'quantity': 2
                },
                {
                    'foodId': 2,
                    'id': null,
                    'isActive': 1,
                    'name': "California Roll",
                    'price': 6.99,
                    'quantity': 4
                }
            ],
            'dateSubmitted': null,
            'refunded': 0,
            'state': 0
        },
        {
            'name': 'French Bistro',
            'restaurantId': 2,
            'address': {
                'city': 'nowhere', 'deliveryTime': null,
                'id': null,
                'state': 'KN',
                'street': 'XXXX YOLO',
                'zipCode': 66666
            },
            'customerId': 96,
            'id': null,
            'orderItems': [
                {
                    'foodId': 1,
                    'id': null,
                    'isActive': 1,
                    'name': "Croissant",
                    'price': 2.99,
                    'quantity': 2
                },
                {
                    'foodId': 2,
                    'id': null,
                    'isActive': 1,
                    'name': "Pan Francaise",
                    'price': 4.99,
                    'quantity': 4
                }
            ],
            'dateSubmitted': null,
            'refunded': 0,
            'state': 0
        }
    
    ];

    let address = {
        'city': 'nowhere', 'deliveryTime': null,
        'id': null,
        'state': 'KN',
        'street': 'XXXX YOLO',
        'zipCode': 66666
    };

    
    let mockLocalStorage = jest.spyOn(window.localStorage.__proto__, 'getItem');
    mockLocalStorage.getItem = jest.fn();
    mockLocalStorage.getItem.mockReturnValueOnce(order);
   // mockLocalStorage.getItem.mockReturnValueOnce(address);

    localStorage.setItem('orders', JSON.stringify(order));
    localStorage.setItem('dropOffAddress', JSON.stringify(address));

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

it("Checkout Renders", async () => {
    let calls = mockAxios.post.mockResolvedValue({
        data: 'stripe_key_id',
        status: 201
    });

    const stripePromise = loadStripe("pk_test_51Iwe6JI3Xcs3HqD5tqc5jdf19qqrUZ7QzkB1jmAdgYOFVSNPZswQ3UFtwVANBw2kbB2XWBHvhVjlD6ijn42BwXpN00MOlvXkn5");
    await act(async () => {
        render( <Elements stripe={stripePromise}><StripeCheckout /></Elements>, container);
    });
    
});

it("Get Stripe Payment Promise from Backend", async () => {
    let calls = mockAxios.post.mockResolvedValue({
        data: 'stripe_key_id',
        status: 201
    });

    const stripePromise = loadStripe("pk_test_51Iwe6JI3Xcs3HqD5tqc5jdf19qqrUZ7QzkB1jmAdgYOFVSNPZswQ3UFtwVANBw2kbB2XWBHvhVjlD6ijn42BwXpN00MOlvXkn5");
    await act(async () => {
        render( <Elements stripe={stripePromise}><StripeCheckout /></Elements>, container);
    });

    expect(calls.mock.calls.length).toBe(1);
    
});

it("Submit button is disabled on open", async () => {
    let calls = mockAxios.post.mockResolvedValue({
        data: 'stripe_key_id',
        status: 201
    });

    const stripePromise = loadStripe("pk_test_51Iwe6JI3Xcs3HqD5tqc5jdf19qqrUZ7QzkB1jmAdgYOFVSNPZswQ3UFtwVANBw2kbB2XWBHvhVjlD6ijn42BwXpN00MOlvXkn5");
    let dom;
    await act(async () => {
        dom = render( <Elements stripe={stripePromise}><StripeCheckout /></Elements>, container);
    });

    expect(document.getElementById("place-order-button").disabled).toBe(true);
    
});

fit("Form Validation", async () => {
    let calls = mockAxios.post.mockResolvedValue({
        data: 'stripe_key_id',
        status: 201
    });

    const stripePromise = loadStripe("pk_test_51Iwe6JI3Xcs3HqD5tqc5jdf19qqrUZ7QzkB1jmAdgYOFVSNPZswQ3UFtwVANBw2kbB2XWBHvhVjlD6ijn42BwXpN00MOlvXkn5");
    let dom;
    await act(async () => {
        dom = render( <Elements stripe={stripePromise}><StripeCheckout /></Elements>, container);
    });

    
    await act(async () => {
        fireEvent.change(dom.getByTestId("first-name", { target: { value: "First Name" } }));
        fireEvent.change(dom.getByTestId("last-name", { target: { value: "Last Name" } }));
        fireEvent.change(dom.getByTestId("street", { target: { value: "Street" } }));
        fireEvent.change(dom.getByTestId("city", { target: { value: "City" } }));
        fireEvent.change(dom.getByTestId("state").querySelector('input'), { target: { value: "TX" } });
        fireEvent.change(dom.getByTestId("zip-code", { target: { value: "34456" } }));
        document.getElementById("cardContainer").classList.remove("StripeElement--empty");
    });

    expect(document.getElementById("place-order-button").disabled).toBe(true);
    
});