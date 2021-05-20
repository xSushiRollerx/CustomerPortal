import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import FoodItem from '../../components/Restaurants/FoodItem';

let container = null;
beforeEach(() => {

    localStorage.setItem('orders', '[]');

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

it("FoodItem renders", () => {
    const item = {
        'id': 298,
        'name': "Oreo Milkshake",
        'summary': "A delicious swirl of deep chocolatey oreo crumbs in a luxurious boat of our signature vanilla ice cream",
        'cost': 5.49
    }

    const restaurant = {
        'id': 42,
        'name': "The Cow Creamery"
    }
    const { getByTestId } = render(<FoodItem item={item} restaurant={restaurant}/>, container);
    expect(getByTestId('FoodItem 298')).toBeInTheDocument();
});

fit("FoodItem renders w/ correct information", () => {
    const item = {
        'id': 298,
        'name': "Oreo Milkshake",
        'summary': "A delicious swirl of deep chocolatey oreo crumbs in a luxurious boat of our signature vanilla ice cream",
        'cost': 5.49
    }

    const restaurant = {
        'id': 42,
        'name': "The Cow Creamery"
    }
    const { getByTestId } = render(<FoodItem item={item} restaurant={restaurant} />, container);
    expect(getByTestId('FoodItem Name 298').textContent()).toBe("Oreo MilkShake");
    expect(getByTestId('FoodItem Summary 298').textContent()).toBe("A delicious swirl of deep chocolatey oreo crumbs in a luxurious boat of our signature vanilla ice cream");
    expect(getByTestId('FoodItem Cost 298').textContent()).toBe("5.49");
});

xit("Click add modal pops up", () => {
    const item = {
        'id': 298,
        'name': "Oreo Milkshake",
        'summary': "A delicious swirl of deep chocolatey oreo crumbs in a luxurious boat of our signature vanilla ice cream",
        'cost': 5.49
    }

    const restaurant = {
        'id': 42,
        'name': "The Cow Creamery"
    }
    const { getByTestId } = render(<FoodItem item={item} restaurant={restaurant} />, container);
    expect(document.getElementsByName('FoodItem 298')[0].textContent()).toBe("Oreo MilkShake");
    expect(getByTestId('FoodItem Summary 298').textContent()).toBe("A delicious swirl of deep chocolatey oreo crumbs in a luxurious boat of our signature vanilla ice cream");
    expect(getByTestId('FoodItem Cost 298').textContent()).toBe("5.49");
});