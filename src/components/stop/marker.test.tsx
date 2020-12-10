import { shallow } from 'enzyme';
import React from 'react';

import Component from './marker';

describe('StopMarker', () => {
  it('renders', () => {
    /* const stop = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [39.26375176777378, -6.778027365319448],
      },
      properties: {
        stop_id: 'MOROCCO05',
        stop_name: 'Morocco BRT',
        wheelchair_boarding: 0,
        zone_id: 'MOROCCO05',
        agency_key: 'Safiri',
        agency_name: 'Safiri',
      },
    }; */

    expect(
      shallow(
        <Component type="bus" onPress={() => console.log(`You clicked`)} />,
      ),
    ).toMatchSnapshot();
  });
});
