import React from 'react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
confirgure({ adapter: new Adapter() });
import Gallery from '../client/src/index.jsx';


describe('Gallery component', () => {
  test('renders', () => {
    const wrapper = shallow(<Gallery />);

    expect(wrapper.exists()).toBe(true);
  });
});