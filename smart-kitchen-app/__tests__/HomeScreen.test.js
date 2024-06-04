import React from "react";
import renderer from "react-test-renderer";
import { ProductContext, ProductProvider } from '../context';
import HomeScreen from "../screens/HomeScreen";

describe("<HomeScreen />", () => {
    it("has 2 element, when not logged in", () => {
        const mockContext = [ [], () => {} ];
        const tree = renderer.create(
            <ProductContext.Provider value={mockContext}>
                <HomeScreen />
            </ProductContext.Provider>
        ).toJSON();
        expect(tree.children.length).toBe(2);
    });

    it("render when logged in", () => {
        const user = "a@a.com";
        const mockContext = [ [], jest.fn(), user, jest.fn()];
        const tree = renderer.create(
            <ProductProvider value={mockContext}>
                <HomeScreen />
            </ProductProvider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});