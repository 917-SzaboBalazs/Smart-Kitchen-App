import React from "react";
import renderer from "react-test-renderer";

import SignupScreen from "../screens/SignupScreen";

describe("<SignupScreen />", () => {
    it("has 6 elements", () => {
        const tree = renderer.create(<SignupScreen />).toJSON();
        expect(tree.children.length).toBe(6);
    });

    it("renders correctly", () => {
        const tree = renderer.create(<SignupScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders title correctly", () => {
        const tree = renderer.create(<SignupScreen />).toJSON();
        expect(tree.children[0].children[0]).toBe("Sign Up");
    });

    it("renders email input correctly", () => {
        const tree = renderer.create(<SignupScreen />).toJSON();
        expect(tree.children[1].props.placeholder).toBe("Email*");
    });

    it("renders password input correctly", () => {
        const tree = renderer.create(<SignupScreen />).toJSON();
        expect(tree.children[2].props.placeholder).toBe("Password*");
    });

    it("renders password again input correctly", () => {
        const tree = renderer.create(<SignupScreen />).toJSON();
        expect(tree.children[3].props.placeholder).toBe("Password again*");
    });

    it("renders password hint correctly", () => {
        const tree = renderer.create(<SignupScreen />).toJSON();
        expect(tree.children[4].type).toBe("Text");
    });

    it("renders sign up button correctly", () => {
        const tree = renderer.create(<SignupScreen />).toJSON();
        expect(tree.children[5].type).toBe("View");
    });
});