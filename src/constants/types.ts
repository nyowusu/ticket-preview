/* eslint-disable prettier/prettier */
// export interface IShape {
//   level_id: null;
//   location_type: 1;
//   parent_station: '';
//   platform_code: null;
//   stop_code: '';
//   stop_desc: 'BRT Terminal';
//   stop_id: 'USALAMA0';
//   stop_lat: -6.806086;
//   stop_lon: 39.254205;
//   stop_name: 'Usalama';
//   stop_timezone: 'Africa/Dar_es_Salaam';
//   stop_url: '';
//   tts_stop_name: null;
//   wheelchair_boarding: null;
//   zone_id: '';
// }

export interface IStopMini {
  stop_id: string;
  stop_lat: number;
  stop_lon: number;
  stop_name: string;
  stop_desc?: string;
}

export interface IStop extends IStopMini {
  parent_station?: string;
  stop_code?: string;
  stop_timezone?: string;
  stop_url?: string;
  zone_id?: string;
  agency_key?: string;
  loc?: number[];
}

// export interface IShape {
//   shape_id: string;
//   shape_pt_sequence: number;
//   shape_pt_lon: number;
//   shape_pt_lat: number;
//   agency_key: 'Safiri';
//   loc: [number, number];
// }

export interface LatLon {
  latitude: number;
  longitude: number;
}

export interface IFormattedStop {
  tripId?: string;
  stopId: string;
  arrivalTime: string;
  stopSequence: number;
  stopName: string;
  latitude: number;
  longitude: number;
  stopDescription?: string;
}

export interface IShape {
  id: number;
  shape_id: string;
  shape_pt_sequence: number;
  shape_pt_lon: number;
  shape_pt_lat: number;
  shape_dist_traveled: string;
}

export interface IStops {
  type: 'Feature';
  geometry: {
    type: 'Point' | 'Custom';
    coordinates: [number, number];
  };
  properties: IStopsProperties;
}

export interface IStopsProperties {
  stop_id: string;
  stop_name: string;

  stop_lon?: number;
  stop_lat?: number;
  parent_station?: string;
  stop_code?: string;
  stop_desc?: string;
  stop_timezone?: string;
  stop_url?: string;
  zone_id?: string;
  agency_key?: string;
  agency_name?: string;
}

export interface IStopMini {
  stop_id: string;
  stop_lat: number;
  stop_lon: number;
  stop_name: string;
  stop_desc?: string;
}

export interface IStop extends IStopMini {
  parent_station?: string;
  stop_code?: string;
  stop_timezone?: string;
  stop_url?: string;
  zone_id?: string;
  agency_key?: string;
  loc?: number[];
}
