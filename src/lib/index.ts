/* eslint-disable prettier/prettier */
import {Platform, StyleSheet} from 'react-native';
import {PROVIDER_GOOGLE} from 'react-native-maps';

export const IMapsViewStyle = {
  ...StyleSheet.absoluteFillObject,
  zIndex: 1,
};

export const customDarkModeMapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#263c3f',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6b9a76',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#38414e',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#212a37',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9ca5b3',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#1f2835',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#f3d19c',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2f3948',
      },
    ],
  },
  {
    featureType: 'transit',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#515c6d',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
];

export const customLightModeMapStyle = [
  {
    featureType: 'transit',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];

export const MapViewProps = {
  // The map framework to use. Either "google" for GoogleMaps, otherwise null or undefined to use the native map framework (MapKit in iOS and GoogleMaps in android).
  provider: Platform.select({
    ios: null,
    android: PROVIDER_GOOGLE,
  }),
  // provider:{PROVIDER_GOOGLE}

  // The app will ask for the user's location.
  showsUserLocation: true,

  // If false hide the button to move map to the current user's location.
  showsMyLocationButton: true,

  // A Boolean indicating whether the map displays extruded building information.
  showsBuildings: true,

  // If false the user won't be able to pinch/zoom the map.
  zoomEnabled: true,

  // If false the user won't be able to change the map region being displayed.
  scrollEnabled: true,

  // mapType:"hybrid"

  // If false points of interest won't be displayed on the map.
  showsPointsOfInterest: true,

  // If false compass won't be displayed on the map.
  showsCompass: true,

  // A Boolean value indicating whether the map displays traffic information.
  // showsTraffic

  // A Boolean indicating whether the map shows scale information. Note: Apple Maps only.
  showsScale: true,

  // If true a loading indicator will show while the map is loading.
  loadingEnabled: true,

  // Customize GoogleMaps to hide "transit data"
  customMapStyle: customLightModeMapStyle,
};

export const zoomLevelToShowStopsAt = 15;

export default {};
