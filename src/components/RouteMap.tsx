import React, { useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Stop {
  name: string;
  description?: string;
  lat: number;
  lng: number;
}

interface RouteMapProps {
  stops: Stop[];
  className?: string;
}

// Component to fit the map bounds to show all markers
const FitBounds = ({ stops }: { stops: Stop[] }) => {
  const map = useMap();
  
  useEffect(() => {
    if (stops && stops.length > 0) {
      const bounds = new L.LatLngBounds(stops.map(stop => [stop.lat, stop.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, stops]);
  
  return null;
};

// Component to set up Leaflet default icon
const SetupLeafletIcon = () => {
  useEffect(() => {
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }, []);
  
  return null;
};

const RouteMap: React.FC<RouteMapProps> = ({ stops, className = '' }) => {
  // If no stops, show a message
  if (!stops || stops.length === 0) {
    return (
      <div className={`w-full h-[400px] bg-gray-100 rounded-lg flex flex-col items-center justify-center p-4 text-center ${className}`}>
        <MapPin className="w-12 h-12 text-amber-500 mb-4" />
        <h3 className="text-lg font-semibold">No Route Data</h3>
        <p className="text-gray-600">No stops are available for this route.</p>
      </div>
    );
  }

  // Prepare polyline coordinates
  const polylinePositions = stops.map(stop => [stop.lat, stop.lng]);
  
  // Center on the first stop by default (will be adjusted by FitBounds)
  const center: [number, number] = [stops[0].lat, stops[0].lng];

  return (
    <div className={`w-full h-[400px] rounded-lg overflow-hidden ${className}`}>
      <MapContainer
        center={center}
        zoom={10}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        {/* Setup Leaflet icons */}
        <SetupLeafletIcon />
        
        {/* OpenStreetMap tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Draw route line */}
        <Polyline 
          positions={polylinePositions as L.LatLngExpression[]} 
          color="#FF0000" 
          weight={3}
        />
        
        {/* Add markers for each stop */}
        {stops.map((stop, index) => (
          <Marker 
            key={`${stop.name}-${index}`} 
            position={[stop.lat, stop.lng]}
          >
            <Popup>
              <div>
                <h3 className="font-semibold">{stop.name}</h3>
                {stop.description && <p className="text-sm mt-1">{stop.description}</p>}
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* Fit map to show all stops */}
        <FitBounds stops={stops} />
      </MapContainer>
    </div>
  );
};

export default RouteMap; 