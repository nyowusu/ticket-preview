/* eslint-disable prettier/prettier */
import React from 'react';
import {Marker, MapEvent, LatLng} from 'react-native-maps';

import StopIcon, {IStopType} from '../icons/stop';
import {IStops} from '../../constants/types';

interface IProps {
  type?: IStopType;
  onPress?: (
    event: MapEvent<{
      action: 'marker-press';
      id: string;
    }>,
  ) => void;
  stop?: IStops;

  id?: string;
  coordinate?: LatLng;
  showStopName?: boolean;
  stopName: string;
  stopDescription: string;
  backgroundColor?: string;
  markerRef?: React.Ref<Marker>;
}

const SIZE = 50;

function StopMarker({
  stop,
  type,
  onPress,
  coordinate = {latitude: 0, longitude: 0},
  showStopName = false,
  id,

  stopName,
  backgroundColor,
  markerRef,
}: IProps) {
  const markerProps: any = {
    width: SIZE,
    height: SIZE,
    // anchor: {x: 0.5, y: 0.5},
    coordinate,
    // Sets whether this marker should track view changes. It's recommended to turn it off whenever it's possible to improve custom marker performance.
    // tracksViewChanges: false,
    style: {
      zIndex: 1000,
    },
  };

  if (showStopName && (stop as IStops)?.properties.stop_name)
    markerProps.title = (stop as IStops)?.properties.stop_name;

  if (onPress) markerProps.onPress = onPress;

  markerProps.title = stopName;

  return (
    <Marker {...markerProps} identifier={id} ref={markerRef}>
      <StopIcon type={type} size={SIZE} backgroundColor={backgroundColor} />
    </Marker>
  );
}

export default StopMarker;
