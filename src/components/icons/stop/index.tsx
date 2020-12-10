import React from 'react';
import {View, StyleSheet} from 'react-native';
// import FeatherIcons from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {lightBlue, white, black} from '../../../constants/colors';

export type IStopType =
  | 'bus'
  | 'train'
  | 'boat'
  | 'bajaji'
  | 'taxi'
  | 'bicycle'
  | 'motorcycle'
  | 'plane';

interface IProps {
  /**
   * Type of stop
   */
  type?: IStopType;

  /**
   * Width and height of the stop. This is useful when you want to make the marker size large enough to tap on
   *
   * @default 50
   */
  size?: number;

  /**
   * Show or hide line underneath of stop
   *
   * @default true
   */
  showLine?: boolean;

  /**
   * Sets background color of the circle
   *
   * @default lightBlue
   */
  backgroundColor?: string;
}

function StopIcon({
  type = 'bus',
  size = 50,
  showLine = true,
  backgroundColor = lightBlue,
}: IProps) {
  return (
    <View
      style={[
        styles.container,
        size
          ? {
              width: size,
              height: size,
              borderRadius: size && size / 2,
            }
          : {},
      ]}>
      <View style={[styles.circle, {backgroundColor}]}>
        {type === 'train' && (
          <Ionicons
            name="ios-train"
            style={styles.listIconStyle}
            size={18}
            color={white}
          />
        )}

        {type === 'bus' && (
          <Ionicons
            name="md-bus"
            style={styles.listIconStyle}
            size={18}
            color={white}
          />
        )}

        {type === 'taxi' && (
          <Icon
            name="taxi"
            style={styles.listIconStyle}
            size={18}
            color={white}
          />
        )}

        {type === 'plane' && (
          <Ionicons
            name="ios-airplane"
            style={styles.listIconStyle}
            size={18}
            color={white}
          />
        )}

        {type === 'boat' && (
          <Ionicons
            name="md-boat"
            style={styles.listIconStyle}
            size={18}
            color={white}
          />
        )}

        {type === 'bicycle' && (
          <Ionicons
            name="md-bicycle"
            style={styles.listIconStyle}
            size={18}
            color={white}
          />
        )}

        {type === 'motorcycle' && (
          <Icon
            name="motorcycle"
            style={styles.listIconStyle}
            size={18}
            color={white}
          />
        )}
      </View>

      {showLine && <View style={[styles.line, {backgroundColor: black}]} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',

    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
  },
  circle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 28,
    width: 28,
    borderRadius: 28,
    backgroundColor: lightBlue,
  },
  line: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white,
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
    width: 2.5,
    height: 15,
  },
  listIconStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    color: white,
  },
});

export default StopIcon;
