import { shallow } from 'enzyme';
import React from 'react';
import StopFeatures from './features';

it('renders correctly', () => {
  // test data
  const defaultProps = {
    stop: {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [20, 20],
      },
      properties: {
        stop_id: 'sDi',
        stop_name: 'name',
      },
    },
    updates: 8,
  };

  // @ts-ignore
  expect(shallow(<StopFeatures {...defaultProps} />)).toMatchSnapshot();
});
