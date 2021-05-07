import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Order from '../components/Order';
import App from '../App';
import { unmountComponentAtNode } from "react-dom";

let container = null;
beforeEach(() => {
    let foodOrder = {
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
        'refunded': 0,
        'state': 0
    }

    localStorage.setItem('order', JSON.stringify(foodOrder));
    console.log("setup " + localStorage.getItem('order'));
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
    const {getByTestId} = render(<Order/>, container);
    expect(getByTestId('DropOffForm')).toBeInTheDocument();
});

it("order summary renders", () => {
    const { getByTestId } = render(<Order />, container);
    expect(getByTestId('OrderSummary')).toBeInTheDocument();
});

it("order items render", () => {
    const { getByTestId } = render(<Order />, container);
    for (let i = 0; i < JSON.parse(localStorage.getItem('order')).orderItems.length; i++) {
        expect(getByTestId('OrderItem ' + i)).toBeInTheDocument();
    }
});

it("order item quantity changes tests", () => {
    const { getByTestId } = render(<Order />, container);

    for (let i = 0; i < JSON.parse(localStorage.getItem('order')).orderItems.length; i++) {
        let itemQuantity = getByTestId("item quantity " + i);
        let itemTotal = getByTestId("item total " + i)
        fireEvent.change(itemQuantity, { target: { value: 5 } });

        //order item quantity element changes
        expect(itemQuantity.value).toBe("5");

        //order item total changes
        expect(itemTotal.textContent).toBe("$" + (5 * JSON.parse(localStorage.getItem('order')).orderItems[i].price).toFixed(2));

        //new value saved to LocalStorage
       expect(JSON.parse(localStorage.getItem('order')).orderItems[i].quantity).toBe(5);
    }
});

it("order item removal tests", () => {
    const { getByTestId } = render(<Order />, container);

    fireEvent.click(getByTestId("OrderItemDelete 0"));

    //orderItem size is reduced by one
    expect(JSON.parse(localStorage.getItem('order')).orderItems.length).toBe(1);

    
});

it("order item all removal tests", () => {
    const { getByTestId } = render(<Order />, container);
    let size = JSON.parse(localStorage.getItem('order')).orderItems.length;
    for (let i = 0; i < size; i++) {
        fireEvent.click(getByTestId("OrderItemDelete 0"));
    }
    expect(getByTestId('NoItems')).toBeTruthy();
    expect(getByTestId('NoItems').textContent).toBe('No Items . . . Go Shopping!');
 
});


it("drop off form visibility tests", () => {
    const { getByTestId } = render(<Order />, container);

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
    const { getByTestId } = render(<Order />, container);
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
    expect(JSON.parse(localStorage.getItem('order')).address.street).toBe("1946 Yellow Brick Road");
    expect(JSON.parse(localStorage.getItem('order')).address.city).toBe("MunchkinVille");
    expect(JSON.parse(localStorage.getItem('order')).address.state).toBe("Oz");
    expect(JSON.parse(localStorage.getItem('order')).address.zipCode).toBe(30449);
});

it("check out button functionality", () => {
    const historyMock = { push: jest.fn() };
    const { getByTestId } = render(<Order history={historyMock} />, container);

    fireEvent.click(getByTestId('EditAddress'));

    fireEvent.change(getByTestId("DropOffFormStreet"), { target: { value: "1946 Yellow Brick Road" } });
    fireEvent.change(getByTestId("DropOffFormCity"), { target: { value: "MunchkinVille" } });
    fireEvent.change(getByTestId("DropOffFormState"), { target: { value: "Oz" } });
    fireEvent.change(getByTestId("DropOffFormZipCode"), { target: { value: 30449 } });

    fireEvent.click(getByTestId('DropOffFormSubmit'));

    fireEvent.click(getByTestId('OrderSummaryCheckOut'));

    expect(historyMock.push.mock.calls[0]).toEqual(['/confirmation'], getByTestId("Order"));
});





