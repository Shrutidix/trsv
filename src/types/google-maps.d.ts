declare namespace google.maps {
  class Map {
    constructor(mapDiv: Element | null, opts?: MapOptions);
    fitBounds(bounds: LatLngBounds): void;
  }

  class Marker {
    constructor(opts: MarkerOptions);
    setMap(map: Map | null): void;
    getPosition(): LatLng | null;
    addListener(event: string, handler: Function): void;
  }

  class Polyline {
    constructor(opts: PolylineOptions);
    setMap(map: Map | null): void;
  }

  class LatLngBounds {
    constructor();
    extend(latLng: LatLng | LatLngLiteral): void;
  }

  class InfoWindow {
    constructor(opts?: InfoWindowOptions);
    open(map?: Map, anchor?: Marker): void;
  }

  interface LatLng {
    lat(): number;
    lng(): number;
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  interface MapOptions {
    center: LatLngLiteral;
    zoom: number;
    styles?: MapTypeStyle[];
  }

  interface MarkerOptions {
    position: LatLngLiteral;
    map?: Map;
    title?: string;
    label?: MarkerLabel;
  }

  interface MarkerLabel {
    text: string;
    color: string;
  }

  interface PolylineOptions {
    path: LatLngLiteral[];
    geodesic?: boolean;
    strokeColor?: string;
    strokeOpacity?: number;
    strokeWeight?: number;
  }

  interface InfoWindowOptions {
    content?: string | Element;
  }

  interface MapTypeStyle {
    featureType?: string;
    elementType?: string;
    stylers: MapTypeStyler[];
  }

  interface MapTypeStyler {
    color?: string;
  }
}

declare module '@googlemaps/js-api-loader' {
  export class Loader {
    constructor(options: LoaderOptions);
    load(): Promise<typeof google>;
  }

  interface LoaderOptions {
    apiKey: string;
    version: string;
  }
} 