/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {lighterGrey} from '../../constants/colors';

export interface IProps {
  stopName: string;
  stopDescription: string;
}

export default function CustomCallOut({stopName, stopDescription}: IProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.stopName}>{stopName}</Text>
      <Text style={styles.stopDescription}>{stopDescription}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: lighterGrey,
  },
  stopName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  stopDescription: {
    fontSize: 13,
    fontWeight: '500',
  },
});
