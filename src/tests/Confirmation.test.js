import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Confirmation from '../components/Confirmation';
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

it("drop off form renders", () => {
    const {getByTestId} = render(<Confirmation/>, container);
    expect(getByTestId('DropOffForm')).toBeInTheDocument();
});

it("order summary renders", () => {
    const { getByTestId } = render(<Confirmation />, container);
    expect(getByTestId('OrderSummary')).toBeInTheDocument();
});

it("drop off form visibility tests", () => {
    const { getByTestId } = render(<Confirmation />, container);

    let dropOffForm = getByTestId('DropOffForm');
    expect(dropOffForm.style.display).toBe('none');

    fireEvent.click(getByTestId('EditAddress'));
    expect(dropOffForm.style.display).toBe('block');

    fireEvent.click(getByTestId('DropOffFormCancel'));
    expect(dropOffForm.style.display).toBe('none');

    fireEvent.click(getByTestId('EditAddress'));
    expect(dropOffForm.style.display).toBe('block');

    fireEvent.click(getByTestId('DropOffFormSubmit'));
    expect(dropOffForm.style.display).toBe('none');
    
});

it("drop off form fillout", () => {
    const { getByTestId } = render(<Confirmation />, container);
    fireEvent.click(getByTestId('EditAddress'));

    fireEvent.change(getByTestId("DropOffFormStreet"), { target: { value: "1946 Yellow Brick Road" } });
    fireEvent.change(getByTestId("DropOffFormCity"), { target: { value: "MunchkinVille" } });
    fireEvent.change(getByTestId("DropOffFormState"), { target: { value: "Oz" } });
    fireEvent.change(getByTestId("DropOffFormZipCode"), { target: { value: 30449 } });

    fireEvent.click(getByTestId('DropOffFormSubmit'));

    //renders in order summary
    expect(getByTestId("OrderSummaryStreet").textContent).toBe("1946 Yellow Brick Road");
    expect(getByTestId("OrderSummaryCityState").textContent).toBe("MunchkinVille, Oz");
    expect(getByTestId("OrderSummaryZipCode").textContent).toBe("30449");

    //saves to local storage properly
    expect(JSON.parse(localStorage.getItem('orders'))[0].address.street).toBe("1946 Yellow Brick Road");
    expect(JSON.parse(localStorage.getItem('orders'))[0].address.city).toBe("MunchkinVille");
    expect(JSON.parse(localStorage.getItem('orders'))[0].address.state).toBe("Oz");
    expect(JSON.parse(localStorage.getItem('orders'))[0].address.zipCode).toBe(30449);
});

it("place order button functionality", () => {
    const historyMock = { push: jest.fn() };
    const { getByTestId } = render(<Confirmation history={historyMock} />, container);

    fireEvent.click(getByTestId('EditAddress'));

    fireEvent.click(getByTestId('DropOffFormSubmit'));

    fireEvent.click(getByTestId('OrderSummaryCheckOut'));

    
    //expect(historyMock.push.mock.calls[0]).toEqual(['/completion'], getByTestId("Confirmation"));
    expect(JSON.parse(localStorage.getItem('orders')).length).toBe(0);
});





