import mapboxgl, { GeolocateControl, Map, Marker } from 'mapbox-gl';
import { useEffect, useMemo, useRef, useState } from 'react';
import getPharmacy from '../api/getPharmacy';
import { MapStateProps, PharmacyDataProps } from '../definition';
import getUserLocation from '../utils/getUserLocation';
import { addNavigationControl } from '../utils/addNavigationControl';

mapboxgl.accessToken = import.meta.env.VITE_API_KEY as string;

type UseMapBoxProps = {
  mapContainer: React.MutableRefObject<HTMLDivElement | null>;
  pharmacyData: PharmacyDataProps[] | undefined;
  pharmacyDataOnClick: PharmacyDataProps | null;
};

export const useMapBox = (): UseMapBoxProps => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [pharmacyData, setPharmacyData] = useState<
    PharmacyDataProps[] | undefined
  >([]);
  const [pharmacyDataOnClick, setPharmacyDataOnClick] =
    useState<PharmacyDataProps | null>(null);
  const mapRef = useRef<Map | null>(null);
  const markerRef = useRef<Marker[]>([]);
  const geolocateRef = useRef<GeolocateControl | null>(null);
  const [mapState, setMapState] = useState<MapStateProps>({
    lng: -80.5801,
    lat: 35.4091,
    zoom: 12,
  });

  // Store the location proximity in a memoized value
  const locationProximity = useMemo(
    () => [mapState.lng, mapState.lat],
    [mapState.lat, mapState.lng]
  );

  // Initialize the map on the first render
  useEffect(() => {
    if (mapRef.current) return;
    const map = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [mapState.lng, mapState.lat],
      zoom: mapState.zoom,
    });

    // Update the map state based on the map movement
    map.on('move', () => {
      setMapState({
        lng: parseFloat(map.getCenter().lng.toFixed(4)),
        lat: parseFloat(map.getCenter().lat.toFixed(4)),
        zoom: parseFloat(map.getZoom().toFixed(2)),
      });
    });

    // Set the map's initial position to the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          map.jumpTo({
            center: [longitude, latitude],
          });
          setMapState({
            lng: parseFloat(longitude.toFixed(4)),
            lat: parseFloat(latitude.toFixed(4)),
          });
          new mapboxgl.Marker({ color: 'red' })
            .setLngLat([longitude, latitude])
            .addTo(map);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error('User denied the request for Geolocation.');
              break;
            case error.POSITION_UNAVAILABLE:
              console.error('Location information is unavailable.');
              break;
            case error.TIMEOUT:
              console.error('The request to get user location timed out.');
              break;
            default:
              console.error('An unknown error occurred: ' + error.message);
              break;
          }
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser');
    }

    mapRef.current = map;
  }, [mapState, locationProximity]);

  // Add the necessary controls to the map when the map is loaded
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;
    const loadListener = () => {
      getUserLocation({ map, geolocateRef });
      addNavigationControl(map);
    };

    map.on('load', loadListener);

    return () => {
      map.off('load', loadListener);
    };
  }, []);

  // Fetch the pharmacy data based on the location proximity
  useEffect(() => {
    const abortController = new AbortController();
    if (mapRef.current) {
      getPharmacy({
        mapRef: mapRef,
        locationCoords: locationProximity as [number, number],
        token: mapboxgl.accessToken,
        markerRef: markerRef,
        abortController,
        onClickPharmacy: setPharmacyDataOnClick,
      })
        .then((data) => setPharmacyData(data))
        .catch((error) =>
          console.error(`Error fetching pharmacy data: ${error}`)
        );
    }
    return () => abortController.abort();
  }, [locationProximity]);

  // Return the map container ref and the pharmacy data
  return { mapContainer, pharmacyData, pharmacyDataOnClick };
};
