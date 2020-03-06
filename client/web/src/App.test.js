import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import App from './App';

configure({ adapter: new Adapter() });

describe('test app', () => {

  beforeAll(() => {  
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => { 
        return { 
          matches: true,
          addEventListener: jest.fn(),
          removeEventListener: jest.fn()
        } 
      })
    });
  });

  it('Renders', () => {
    const mockStore = configureStore();
    const store = mockStore({
      auth: {},
    });
    const wrapper = shallow(
        <App store={store }/>
    ).dive();
    console.log(wrapper.debug());
    expect(wrapper.dive().find('.app')).toHaveLength(1);
  });
});

