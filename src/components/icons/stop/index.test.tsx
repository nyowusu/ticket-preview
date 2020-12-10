import { shallow } from 'enzyme';
import React from 'react';

import Component from './index';

describe('StopIcon', () => {
  it('renders', () => {
    expect(shallow(<Component type="bus" />)).toMatchSnapshot();
  });
});
