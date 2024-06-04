import React from 'react';
import renderer from 'react-test-renderer';

import App from '../App';

describe('<App />', () => {
  it('has 1 element and the toast', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.length).toBe(2);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
