import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';

import Touchable from '../touchable';
import { OpenSansSemiBold } from '../../constants/fonts';
import { lightBlue, grey, white, black } from '../../constants/colors';
import StopDetails from '../departures/stop-details';

// load all screens
import * as screens from '../../constants/screens';
import { createModalLayout } from '../../config/navigation';

// Load internationalization languages
import { translation } from '../../lib/hooks/translations';
import { IStops, IRoute } from '../../state/GTFS/types';

// use Navigation Constants
// import { INavigationConstants } from '../../lib/hooks/navigationConstants';
export interface INavigationConstants {
  backButtonId?: string;
  bottomTabsHeight?: number;
  statusBarHeight?: number;
  topBarHeight?: number;
}

interface IProps {
  stop: IStops;
  updates?: number;
}

interface IFeatureProps {
  name: string;
  onPress: () => void;
  containerStyles?: any;
}

const { width, height } = Dimensions.get('window');

// handler for showing screens
const handleOnPress = (screen: string, title: string, options?: object) => () =>
  createModalLayout(screen, { text: title }, options);

const StopFeatures = ({ stop, updates = 0 }: IProps) => {
  let bottom = Platform.select({
    ios: 83,
    android: 56,
  }) as number;

  // create the list of buses going through route
  const busList =
    stop &&
    stop.properties.routes?.map((route: IRoute) => ({
      routeId: route.route_id,
      name: route.route_short_name,
      color: route.route_text_color,
      bgColor: route.route_color,
    }));

  // get navigation constants
  const [navigationConstants, setNavigationConstants] = useState<
    INavigationConstants
  >({ bottomTabsHeight: bottom });

  async function getNavigationConstants() {
    try {
      const constants: INavigationConstants = await Navigation.constants();
      setNavigationConstants(constants);

      bottom = constants.bottomTabsHeight as number;
      console.log(bottom, constants, navigationConstants, height - bottom);
    } catch (error) {
      bottom = Platform.select({
        ios: 83,
        android: 56,
      }) as number;
    }
  }

  useEffect(() => {
    getNavigationConstants();
  }, []);

  // screen options
  const featureDetails = [
    {
      name: translation('stop.features.departures'),
      onPress: handleOnPress(
        screens.Departures,
        translation('screenTitles.departures'),
        {
          passProps: {
            busList,
            stop,
            updates,
          },
        },
      ),
    },
    {
      name: translation('stop.features.getMeHere'),
      onPress: handleOnPress(
        screens.GetMeHere,
        translation('screenTitles.getMeHere'),
      ),
    },
    {
      name: translation('stop.features.trackBuses'),
      onPress: handleOnPress(
        screens.TrackBuses,
        translation('screenTitles.trackBuses'),
      ),
    },
  ];

  return (
    <View style={[styles.container, { bottom }]}>
      {busList && (
        <StopDetails
          busList={busList}
          stopId={stop.properties.stop_id}
          stopName={stop.properties.stop_name}
          updates={updates}
          containerStyles={styles.stopDetailsContainer}
        />
      )}

      <View style={styles.containerShadow}>
        {featureDetails.map((feature, index) => (
          <StopFeature
            key={feature.name}
            name={feature.name}
            onPress={feature.onPress}
            containerStyles={
              // check if the current element is the last one give it no border
              (index === featureDetails.length - 1 && styles.feature) || [
                styles.feature,
                styles.withBorder,
              ]
            }
          />
        ))}
      </View>
    </View>
  );
};

const StopFeature = ({ name, onPress, containerStyles }: IFeatureProps) => (
  <Touchable onPress={onPress}>
    <View style={containerStyles}>
      <Text style={styles.featureText}>{name}</Text>
    </View>
  </Touchable>
);

const styles = StyleSheet.create({
  container: {
    width,
    display: 'flex',
    position: 'absolute',
    left: 0,
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0)',
    zIndex: 3,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  stopDetailsContainer: {
    marginBottom: 10,
    padding: 1.5,
  },
  containerShadow: {
    backgroundColor: white,
    borderRadius: 5,
    borderBottomColor: 'transparent',
    borderWidth: 0,
    borderTopColor: 'transparent',
    shadowColor: black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 10,
  },
  withBorder: {
    borderBottomColor: grey,
    borderBottomWidth: 1,
  },
  featureText: {
    fontFamily: OpenSansSemiBold,
    color: lightBlue,
    fontSize: 16,
    textTransform: 'uppercase',
  },
});

export default StopFeatures;
