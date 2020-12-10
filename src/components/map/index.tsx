/* eslint-disable prettier/prettier */

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import MapView, {LatLng, Marker, Polyline} from 'react-native-maps';
import TimeLine, {Data} from 'react-native-timeline-flatlist';

import {
  black,
  blackTranslucent,
  darkBlue,
  green,
  white,
} from '../../constants/colors';
import {OpenSansRegular} from '../../constants/fonts';
import {IFormattedStop, LatLon, IShape} from '../../constants/types';
import {MapViewProps} from '../../lib';

import Button from '../button';
import StopMarker from '../stop/marker';

const userLocation = {latitude: -6.802353, longitude: 39.279556};

interface IFirstAndLastElementPositions {
  firstElement: number;
  lastElement: number;
}

export default function MapContainer() {
  const initialLocationRegion = {
    latitude: userLocation?.latitude || -6.802353,
    longitude: userLocation?.longitude || 39.279556,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  };

  const mapRef = useRef<MapView>(null);
  const markerRef = useRef<Marker>(null);
  const listStopTouchedRef = useRef<Data>();
  const innerRef = useRef<FlatList>();
  const firstAndLastElementPositionRef = useRef<IFirstAndLastElementPositions>();

  const [preview, setPreview] = useState<{
    shape: LatLng[];
    stops: IFormattedStop[];
  }>();
  const [timeLine, setTimeLine] = useState<Data[]>([]);
  const [listStopTouched, setListStopTouched] = useState<Data>();

  const [loading, setLoading] = useState(false);
  const [tripId, setTripId] = useState('SABRT05:O');
  const [time, setTime] = useState('7:45');

  async function loadStops() {
    setLoading(true);
    const response = await fetch(
      `https://safiri-client-admin-api.herokuapp.com/api/trip/preview?tripId=${tripId}&departureTime=${time}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-authentication-context': 'safiri-client-admin-api',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjM0N2U5OGNjM2YwMTAwMjM0YWVlZTciLCJ1dWlkIjoiNWU4Yjg1NDktOWY2Zi00MDk5LTg3ZGEtYTE2YWExODI2MjVkIiwicm9sZSI6Ijc3NyIsInBlcm1pc3Npb25MZXZlbCI6Nzc3LCJpYXQiOjE2MDI2MjgwMjF9.k97tYZfUhwcafrYmMHUd6LsUDRlUYjd5VF_O6u8hqUc',
        },
      },
    );
    const data: {
      shape: IShape[];
      stops: IFormattedStop[];
    } = await response.json();
    const polyline = data.shape.map((each: IShape) => {
      const latLng: LatLng = {
        latitude: each.shape_pt_lat,
        longitude: each.shape_pt_lon,
      };

      return latLng;
    });

    setPreview({shape: polyline, stops: data.stops});

    // setup timeline
    const timeline = data.stops.map((stop) => {
      const eachTimeLine: Data = {};

      eachTimeLine.time = stop.arrivalTime;
      eachTimeLine.title = stop.stopName;
      eachTimeLine.description = stop.stopDescription;
      eachTimeLine.position = stop.stopSequence.toString();

      return eachTimeLine;
    });

    setTimeLine(timeline);

    setLoading(false);
  }

  function handleTripIdOnChange(text: string) {
    setTripId(text);
  }

  function handleTimeOnChange(text: string) {
    setTime(text);
  }

  function handleOnListStopPress(event: Event) {
    setListStopTouched(event);
    listStopTouchedRef.current = event;
  }

  function handleOnMarkerPress(event: any) {
    const touchedMarker = event.nativeEvent;

    const stop = preview?.stops?.find(
      (item) => item.stopId === touchedMarker.id,
    );

    setListStopTouched({
      time: stop?.arrivalTime,
      title: stop?.stopName,
      position: stop?.stopSequence.toString(),
    });

    listStopTouchedRef.current = {
      time: stop?.arrivalTime,
      title: stop?.stopName,
      position: stop?.stopSequence.toString(),
    };

    // scroll to the element
    innerRef?.current?.scrollToIndex({
      index: stop?.stopSequence as number,
      animated: true,
      viewOffset: 50,
      viewPosition: 0,
    });
  }

  function createMapMarkers() {
    const markers = preview?.stops.map(
      ({
        latitude,
        longitude,
        stopId,
        stopName,
        stopDescription,
        arrivalTime,
      }) => {
        const coordinate: LatLon = {
          latitude,
          longitude,
        };

        const backgroundColor =
          listStopTouched?.time === arrivalTime ? green : undefined;

        return (
          <StopMarker
            markerRef={
              listStopTouched?.time === arrivalTime ? markerRef : undefined
            }
            coordinate={coordinate}
            key={stopId}
            onPress={handleOnMarkerPress}
            id={stopId}
            stopDescription={stopDescription as string}
            stopName={stopName}
            backgroundColor={backgroundColor}
            showStopName
          />
        );
      },
    );

    return markers;
  }

  const handleOnMapPress = useCallback(() => {
    mapRef.current?.fitToElements(true);
    setListStopTouched(undefined);
    listStopTouchedRef.current = undefined;
  }, []);

  function renderDetail(rowData: Data) {
    const selected = rowData.time === listStopTouchedRef.current?.time;

    const selectedTitleStyle = selected ? {fontSize: 16} : {};
    const selectedDescriptionStyle = selected ? {fontSize: 14} : {};

    let title = (
      <View style={{paddingBottom: Y_PADDING}}>
        <Text
          style={[styles.tripListText, styles.tripTitle, selectedTitleStyle]}>
          {rowData.title}
        </Text>
      </View>
    );

    const position: number = +(rowData.position as string);

    const description =
      position === 0
        ? 'Your journey begins here'
        : position === firstAndLastElementPositionRef.current?.lastElement
        ? 'Your journey ends here'
        : undefined;

    let desc = (
      <Text
        style={[
          styles.tripListText,
          styles.tripDescription,
          selectedDescriptionStyle,
        ]}>
        {`${rowData.description}, ${description}`}
      </Text>
    );

    return (
      <View key={rowData.time} style={{marginTop: -10, marginBottom: 10}}>
        {title}
        {desc}
      </View>
    );
  }

  function renderTime(rowData: Data) {
    const selected = rowData.time === listStopTouchedRef.current?.time;

    const selectedTitleStyle = selected ? {fontSize: 16} : {};

    return (
      <Text style={[styles.tripListText, selectedTitleStyle]}>
        {rowData.time}
      </Text>
    );
  }

  const lengthOfArray = preview?.stops?.length;

  useEffect(() => {
    handleOnMapPress();

    firstAndLastElementPositionRef.current = {
      firstElement: 0,
      lastElement: (lengthOfArray as number) - 1,
    };

    return () => {};
  }, [handleOnMapPress, lengthOfArray]);

  const timeOfTouchedStop = listStopTouched?.time;

  useEffect(() => {
    const stop = preview?.stops?.find(
      (item) => item.arrivalTime === listStopTouched?.time,
    );

    if (stop) {
      const {latitude, longitude} = stop;

      // zoom to this stop on the map
      mapRef.current?.animateCamera({
        center: {latitude, longitude},
        zoom: 15,
        altitude: 15,
      });

      markerRef.current?.showCallout();
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeOfTouchedStop, preview]);

  return (
    <>
      {loading && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator style={styles.activityIndicator} />
        </View>
      )}
      <View style={styles.container}>
        {initialLocationRegion && (
          <MapView
            zoomTapEnabled
            onPress={handleOnMapPress}
            ref={mapRef}
            style={styles.map}
            {...MapViewProps}
            initialRegion={initialLocationRegion}>
            {createMapMarkers()}
            {preview?.shape && (
              <Polyline
                coordinates={preview.shape}
                strokeWidth={5}
                strokeColor={blackTranslucent}
              />
            )}
          </MapView>
        )}
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="trip id"
            onChangeText={handleTripIdOnChange}
            defaultValue={tripId}
          />
          <TextInput
            style={styles.input}
            onChangeText={handleTimeOnChange}
            defaultValue={time}
            placeholder="departure time"
          />
        </View>
        <View style={styles.listContainer}>
          <TimeLine
            data={timeLine}
            lineWidth={4}
            innerCircle={'dot'}
            style={styles.tripList}
            options={{style: {paddingTop: 10}, ref: innerRef}}
            timeStyle={styles.tripListText}
            timeContainerStyle={styles.timeContainer}
            onEventPress={handleOnListStopPress}
            listViewContainerStyle={styles.listViewContainer}
            renderDetail={renderDetail}
            renderTime={renderTime}
          />
        </View>
        <View style={styles.continueButtonViewContainer}>
          <View style={styles.button}>
            <Button
              onPress={loadStops}
              title="Load Data"
              variant="rounded-light-blue"
              loading={loading}
              disabled={loading}
            />
          </View>
        </View>
      </View>
    </>
  );
}

const {width, height} = Dimensions.get('window');
const X_PADDING = 12.5;
const Y_PADDING = 10;
const STOPS_LIST_HEIGHT = 300;
const CONTINUE_BUTTON_VIEW_HEIGHT = 170;

const styles = StyleSheet.create({
  container: {
    width,
    height: height - (STOPS_LIST_HEIGHT + CONTINUE_BUTTON_VIEW_HEIGHT),
    display: 'flex',
    backgroundColor: darkBlue,
  },

  bottomContainer: {
    height: STOPS_LIST_HEIGHT + CONTINUE_BUTTON_VIEW_HEIGHT,
    marginBottom: 50,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderStyle: 'solid',
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderColor: black,
  },
  input: {
    backgroundColor: white,
    fontSize: 18,
    paddingHorizontal: 10,
    flexBasis: '45%',
  },
  listContainer: {
    height: STOPS_LIST_HEIGHT,
  },
  listViewContainer: {
    marginHorizontal: 15,
  },
  tripList: {
    flex: 1,
    backgroundColor: darkBlue,

    marginVertical: 5,
  },
  tripListText: {
    color: white,
    fontFamily: OpenSansRegular,
  },

  timeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tripTitle: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  tripDescription: {
    fontSize: 11,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  textColor: {
    color: white,
  },
  button: {
    width: width / 2,
  },

  continueButtonViewContainer: {
    width,
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: CONTINUE_BUTTON_VIEW_HEIGHT,
    paddingVertical: Y_PADDING,
    paddingHorizontal: X_PADDING,
    marginBottom: 50,
  },
  activityIndicatorContainer: {
    zIndex: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'transparent',
    height,
    width,
  },
  activityIndicator: {},
});
