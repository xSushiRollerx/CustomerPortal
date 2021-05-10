import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import OrderCompletion from '../components/OrderCompletion';
import { unmountComponentAtNode } from "react-dom";

let container = null;
beforeEach(() => {
    let foodOrder = [
        {
            'name': 'Tokyo Sushi',
            'restaurantId': 1,
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

    ]

    let address = {
        'city': 'nowhere', 'deliveryTime': null,
        'id': null,
        'state': 'KN',
        'street': 'XXXX YOLO',
        'zipCode': 66666
    };

    localStorage.setItem('orders', JSON.stringify(foodOrder));

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

it("Order Completion renders", () => {
    const {getByTestId} = render(<OrderCompletion/>, container);
    expect(getByTestId('OrderCompletion')).toBeInTheDocument();
});

it("Orders Submitted Success Renders Correctly", () => {
    localStorage.setItem('orders', "[]");
    
    const historyMock = { push: jest.fn() };
    const { getByTestId } = render(<OrderCompletion history={historyMock} />, container);

    expect(getByTestId('OrderCompletion Icon').getAttribute("d")).toBe("M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z");
    expect(getByTestId('OrderCompletion Message').textContent).toBe("Order(s) Sumbitted Sucessfully");
    expect(getByTestId('OrderCompletion Next').textContent).toBe("Go To View Orders");

    fireEvent.click(getByTestId('OrderCompletion Next'));
    expect(historyMock.push.mock.calls[0]).toEqual(['/orders'], getByTestId("OrderCompletion"));
});

it("Something Went Wrong Renders Correctly", () => {
    const historyMock = { push: jest.fn() };
    const { getByTestId } = render(<OrderCompletion history={historyMock} />, container);

    expect(getByTestId('OrderCompletion Icon').getAttribute("d")).toBe("M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z");
    expect(getByTestId('OrderCompletion Message').textContent).toBe("Something Went Wrong Not All Orders Could Be Submitted Successfully");
    expect(getByTestId('OrderCompletion Next').textContent).toBe("Go Back To Cart");

    fireEvent.click(getByTestId('OrderCompletion Next'));
    expect(historyMock.push.mock.calls[0]).toEqual(['/confirmation'], getByTestId("OrderCompletion"));
});




