import React from 'react';
import renderer from 'react-test-renderer';

import LoginScreen from '../screens/LoginScreen';

describe('<LoginScreen />', () => {
    it('has 4 elements', () => {
        const tree = renderer.create(<LoginScreen />).toJSON();
        expect(tree.children.length).toBe(4);
    });
    
    it('renders correctly', () => {
        const tree = renderer.create(<LoginScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders title correctly', () => {
        const tree = renderer.create(<LoginScreen />).toJSON();
        expect(tree.children[0].children[0]).toBe('Log In');
    });

    it('renders email input correctly', () => {
        const tree = renderer.create(<LoginScreen />).toJSON();
        expect(tree.children[1].props.placeholder).toBe('Email');
    });

    it('renders password input correctly', () => {
        const tree = renderer.create(<LoginScreen />).toJSON();
        expect(tree.children[2].props.placeholder).toBe('Password');
    });

    it('renders login button correctly', () => {
        const tree = renderer.create(<LoginScreen />).toJSON();
        expect(tree.children[3].type).toBe('View');
    });
});
