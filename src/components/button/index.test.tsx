import { shallow } from 'enzyme';
import React from 'react';
import { Text } from 'react-native';
import Touchable from './index';

it('renders correctly', () => {
  const style = { borderRadius: 2 };
  const result = shallow(
    <Touchable style={style}>
      <Text>Hello</Text>
    </Touchable>,
  );
  expect(result).toMatchSnapshot();
});
