import React from 'react';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import Gallery from '../client/src/components/Gallery.jsx';
import imagePaths from '../db/photoData.js';


describe('Gallery component', () => {
  it('renders', () => {
    const wrapper = shallow(<Gallery />);
    expect(wrapper.exists()).toBe(true);
  });
  // it('renders images', () => {
  //   const wrapper = shallow(<Gallery />);
  //   expect(wrapper.find('img').prop('src').toEqual(imagePaths));
  // });
});

