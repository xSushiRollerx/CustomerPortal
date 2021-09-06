import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import OrderCart from '../../components/Checkout/OrderCart';
import { unmountComponentAtNode } from "react-dom";

let container = null;
beforeEach(() => {
    let foodOrder = [
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

    ]

    let address = {
        'city': 'nowhere', 'deliveryTime': null,
        'id': null,
        'state': 'KN',
        'street': 'XXXX YOLO',
        'zipCode': 66666
    };

    localStorage.setItem('orders', JSON.stringify(foodOrder));
    localStorage.setItem('dropOffAddress', JSON.stringify(address));

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


fit("orders render", () => {
    const { getByTestId } = render(<OrderCart />, container);
    console.log(localStorage.getItem('orders'));
    for (let i = 0; i < JSON.parse(localStorage.getItem('orders')).length; i++) {
        expect(getByTestId('Order ' + i)).toBeInTheDocument();
    }
});

it("order items render", () => {
    const { getByTestId } = render(<OrderCart />, container);
    let orders = JSON.parse(localStorage.getItem('orders'));
 
    for (let i = 0; i < orders.length; i++) {
        for (let j = 0; j < orders[i].orderItems.length; j++) {
            expect(getByTestId('Order ' + i + ' Item ' + j)).toBeInTheDocument();
        }
    }
});

it("order item quantity changes tests", () => {
    const { getByTestId } = render(<OrderCart />, container);
    let orders = JSON.parse(localStorage.getItem('orders'));

    for (let i = 0; i < orders.length; i++) {
        for (let j = 0; j < orders[i].orderItems.length; j++) {
            let itemQuantity = getByTestId("order " + i + " item quantity " + j);
            let itemTotal = getByTestId("order " + i + " item total " + j);
            fireEvent.change(itemQuantity, { target: { value: 5 } });

            //order item quantity element changes
            expect(itemQuantity.value).toBe("5");

            //order item total changes
            expect(itemTotal.textContent).toBe("$" + (5 * JSON.parse(localStorage.getItem('orders'))[i].orderItems[j].price).toFixed(2));

            //new value saved to LocalStorage
            expect(JSON.parse(localStorage.getItem('orders'))[i].orderItems[j].quantity).toBe(5);
        }
    }

});

it("order item removal tests", () => {
    const { getByTestId } = render(<OrderCart />, container);

    fireEvent.click(getByTestId("Order 0 Delete 0"));

    //orderItem size is reduced by one
    expect(JSON.parse(localStorage.getItem('orders'))[0].orderItems.length).toBe(1);

    
});

it("order item all removal tests", () => {
    const { getByTestId } = render(<OrderCart />, container);
    let orders = JSON.parse(localStorage.getItem('orders'));

    for (let i = 0; i < orders.length; i++) {
        for (let j = 0; j < orders[i].orderItems.length; j++) {
            fireEvent.click(getByTestId('Order ' + 0 + ' Delete ' + 0));
        }
    }
    
    expect(getByTestId('NoItems')).toBeTruthy();
    expect(getByTestId('NoItems').textContent).toBe('No Orders . . . Go Shopping!');
 
});


it("check out button functionality", () => {
    const historyMock = { push: jest.fn() };
    const { getByTestId } = render(<OrderCart history={historyMock} />, container);

    fireEvent.click(getByTestId('OrderSummaryCheckOut'));

    expect(historyMock.push.mock.calls[0]).toEqual(['/confirmation'], getByTestId("Order"));
});





