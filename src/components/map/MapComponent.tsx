import React, { useEffect, useState, useRef } from 'react';
import { MapPin } from 'lucide-react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl';
import { Profile } from '../../types';

// This is a free public Mapbox token for demo purposes only
// In a real app, this should be in an environment variable
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xxMXl1eDFuMHUydzJrbXRjYmJ1dGxvZiJ9.vZTIFBK9Hqu8Tc8foujmew';

interface MapComponentProps {
  profiles: Profile[];
  selectedProfile?: Profile | null;
  onSelectProfile?: (profile: Profile) => void;
  height?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({
  profiles,
  selectedProfile,
  onSelectProfile,
  height = '100%',
}) => {
  const [popupInfo, setPopupInfo] = useState<Profile | null>(null);
  const mapRef = useRef<any>(null);

  // Set initial viewport based on selected profile or all profiles
  const getInitialViewport = () => {
    if (selectedProfile) {
      return {
        latitude: selectedProfile.location.latitude,
        longitude: selectedProfile.location.longitude,
        zoom: 14,
      };
    }

    // If no profile is selected, center the map to show all markers
    if (profiles.length === 0) {
      return {
        latitude: 37.7749,
        longitude: -122.4194, // Default to San Francisco
        zoom: 10,
      };
    }

    // Use the first profile as a fallback
    return {
      latitude: profiles[0].location.latitude,
      longitude: profiles[0].location.longitude,
      zoom: 10,
    };
  };

  const initialViewport = getInitialViewport();

  // Fly to selected profile location when it changes
  useEffect(() => {
    if (selectedProfile && mapRef.current) {
      mapRef.current.flyTo({
        center: [selectedProfile.location.longitude, selectedProfile.location.latitude],
        zoom: 14,
        duration: 1500,
      });
      setPopupInfo(selectedProfile);
    }
  }, [selectedProfile]);

  return (
    <div style={{ height, width: '100%' }} className="rounded-lg overflow-hidden shadow-md">
      <Map
        ref={mapRef}
        initialViewState={initialViewport}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
        attributionControl={true}
      >
        <NavigationControl position="top-right" />
        
        {profiles.map((profile) => (
          <Marker
            key={profile.id}
            longitude={profile.location.longitude}
            latitude={profile.location.latitude}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setPopupInfo(profile);
              if (onSelectProfile) onSelectProfile(profile);
            }}
          >
            <div className={`marker ${selectedProfile?.id === profile.id ? 'active' : ''}`}>
              <MapPin
                size={24}
                className={`text-white transform -translate-x-1/2 -translate-y-1/2 ${
                  selectedProfile?.id === profile.id
                    ? 'scale-125 drop-shadow-lg'
                    : ''
                }`}
              />
            </div>
          </Marker>
        ))}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={popupInfo.location.longitude}
            latitude={popupInfo.location.latitude}
            onClose={() => setPopupInfo(null)}
            closeOnClick={false}
            className="z-10"
            maxWidth="300px"
          >
            <div className="p-2">
              <div className="flex items-center space-x-2">
                <img
                  src={popupInfo.photo}
                  alt={popupInfo.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <h3 className="font-medium text-sm">{popupInfo.name}</h3>
              </div>
              <p className="text-xs text-gray-500 mt-1">{popupInfo.address}</p>
              <a
                href={`/profiles/${popupInfo.id}`}
                className="text-xs text-indigo-600 hover:text-indigo-800 mt-2 block"
              >
                View Profile
              </a>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MapComponent;