import React from 'react';
import { fireEvent, render, wait, waitFor, act, getByTestId } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import mockAxios from 'axios';
import StripeCheckout from '../../pages/StripeCheckout';
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

let container = null;
const mockStripe = {
    confirmCardPayment: jest.fn().mockResolvedValue({error: false})
}
jest.mock("@stripe/react-stripe-js", () => {
    const originalModule = jest.requireActual('@stripe/react-stripe-js');
    return {
      __esModule: true,
      ...originalModule,
      useStripe: jest.fn(),
      useElements: jest.fn()
    };
  });
  

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

it("Form Validation", async () => {
    let calls = mockAxios.post.mockResolvedValue({
        data: 'stripe_key_id',
        status: 201
    });

    useStripe.mockReturnValue(true);

    const stripePromise = loadStripe("pk_test_51Iwe6JI3Xcs3HqD5tqc5jdf19qqrUZ7QzkB1jmAdgYOFVSNPZswQ3UFtwVANBw2kbB2XWBHvhVjlD6ijn42BwXpN00MOlvXkn5");
    let dom;
    await act(async () => {
        dom = render( <Elements stripe={stripePromise}><StripeCheckout /></Elements>, container);
    });

    await act(async () => {
        fireEvent.click(document.getElementById("place-order-button"));
    });

    expect(document.getElementById("place-order-button").disabled).toBe(false);
    expect(dom.getByTestId("first-name-error-text").textContent).toBe("This field is not filled out");
    expect(dom.getByTestId("last-name-error-text").textContent).toBe("This field is not filled out");
    expect(dom.getByTestId("address-error-text").textContent).toBe("This field is not filled out");
    expect(dom.getByTestId("city-error-text").textContent).toBe("This field is not filled out");
    expect(dom.getByTestId("state-error-text").textContent).toBe("This field is not filled out");
    expect(dom.getByTestId("zip-code-error-text").textContent).toBe("This field is not filled out");

    

    await act(async () => {
        fireEvent.change(dom.getByTestId("zip-code"), { target: { value: "344" } });
        fireEvent.click(document.getElementById("place-order-button"));
    });
    expect(dom.getByTestId("zip-code-error-text").textContent).toBe("This field must contain a numeric five digit postal code");


    
});

it("Submit Order to Stripe Successfully", async () => {
    let calls = mockAxios.post.mockResolvedValue({
        data: 'stripe_key_id',
        status: 201
    });

    useStripe.mockReturnValue({
        confirmCardPayment: jest.fn().mockResolvedValue({
            error: false,
            paymentIntent: {status: "succeeded"}
        })
    });
    useElements.mockReturnValue({
        getElement: () => { return 42424242424}
    });

    const stripePromise = loadStripe("pk_test_51Iwe6JI3Xcs3HqD5tqc5jdf19qqrUZ7QzkB1jmAdgYOFVSNPZswQ3UFtwVANBw2kbB2XWBHvhVjlD6ijn42BwXpN00MOlvXkn5");
    let dom;
    await act(async () => {
        dom = render( <Elements stripe={stripePromise}><StripeCheckout /></Elements>, container);
    });

    
    await act(async () => {
        fireEvent.change(dom.getByTestId("first-name"), { target: { value: "First Name" } });
        fireEvent.change(dom.getByTestId("last-name"), { target: { value: "Last Name" } });
        fireEvent.change(dom.getByTestId("street"), { target: { value: "Street" } });
        fireEvent.change(dom.getByTestId("city"), { target: { value: "City" } });
        fireEvent.change(dom.getByTestId("state").querySelector('input'), { target: { value: "GA" } });
        fireEvent.change(dom.getByTestId("zip-code"), { target: { value: "34456" } });
        //can't access stripe fields directly so instead manipulate class name which is used for validation
        document.getElementById("cardContainer").classList.remove("StripeElement--empty");
    });

    document.getElementById("billingState").value = "MO"
    console.log(document.getElementById("billingState").value);

    await act(async () => {
        fireEvent.click(document.getElementById("place-order-button"));
    });

    //if successfule local storage is cleaned out
    expect(localStorage.getItem("orders")).toBe("[]");
    expect(dom.getByTestId("stripe-response").textContent).toBe("Your Order Has Been Processed Successfully!")
    
});

it("Submit Order to Stripe Unsuccessfully", async () => {
    let calls = mockAxios.post.mockResolvedValue({
        data: 'stripe_key_id',
        status: 201
    });

    useStripe.mockReturnValue({
        confirmCardPayment: jest.fn().mockResolvedValue({
            error: { message: "insufficient funds"},
        })
    });
    useElements.mockReturnValue({
        getElement: () => { return 42424242424}
    });

    const stripePromise = loadStripe("pk_test_51Iwe6JI3Xcs3HqD5tqc5jdf19qqrUZ7QzkB1jmAdgYOFVSNPZswQ3UFtwVANBw2kbB2XWBHvhVjlD6ijn42BwXpN00MOlvXkn5");
    let dom;
    await act(async () => {
        dom = render( <Elements stripe={stripePromise}><StripeCheckout /></Elements>, container);
    });

    
    await act(async () => {
        fireEvent.change(dom.getByTestId("first-name"), { target: { value: "First Name" } });
        fireEvent.change(dom.getByTestId("last-name"), { target: { value: "Last Name" } });
        fireEvent.change(dom.getByTestId("street"), { target: { value: "Street" } });
        fireEvent.change(dom.getByTestId("city"), { target: { value: "City" } });
        fireEvent.change(dom.getByTestId("state").querySelector('input'), { target: { value: "GA" } });
        fireEvent.change(dom.getByTestId("zip-code"), { target: { value: "34456" } });
        //can't access stripe fields directly so instead manipulate class name which is used for validation
        document.getElementById("cardContainer").classList.remove("StripeElement--empty");
    });

    document.getElementById("billingState").value = "MO"
    console.log(document.getElementById("billingState").value);

    await act(async () => {
        fireEvent.click(document.getElementById("place-order-button"));
    });

    expect(dom.getByTestId("stripe-response").textContent).toBe("Your Order Was Not Processed Successfully. insufficient funds")
    
});