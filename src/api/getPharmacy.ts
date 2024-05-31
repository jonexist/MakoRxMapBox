import { Map, Marker } from 'mapbox-gl';
import { MutableRefObject } from 'react';
import { MapboxEndpoint, PharmacyDataProps } from '../definition';
import { PopupMarker } from '../components/service-selection/PopupMarker';

type PharmacyPopup = {
  map: Map;
  pharmacyData: PharmacyDataProps;
  markerRef: MutableRefObject<Marker[]>;
  onClickPharmacy: (pharmaryData: PharmacyDataProps) => void;
};

type GetPharmacyProps = {
  mapRef: MutableRefObject<Map | null>;
  locationCoords: [number, number];
  token: string;
  markerRef: MutableRefObject<Marker[]>;
  abortController: AbortController;
};

// Define the endpoint for the pharmacy data
const api = ({ placeType, lng, lat, token }: MapboxEndpoint): string =>
  `https://api.mapbox.com/geocoding/v5/mapbox.places/${placeType}.json?proximity=${lng},${lat}&access_token=${token}`;

// Function to process the pharmacy data and add markers to the map
const processPharmacyData = ({
  map,
  markerRef,
  pharmacyData,
  onClickPharmacy,
}: PharmacyPopup): void => {
  const { coordinates } = pharmacyData.geometry;

  // Create a marker for each pharmacy
  const marker = new Marker().setLngLat(coordinates).addTo(map);

  // Add the marker to the markerRef
  markerRef.current.push(marker);

  // Add a popup to the marker
  PopupMarker({
    map,
    marker,
    popupText: `<small>${pharmacyData.properties.category.toUpperCase()}</small><br><strong>${
      pharmacyData.text
    }</strong><br><small>${pharmacyData.place_name}</small>`,
    pharmacyId: pharmacyData.id,
    onClickPharmacy: () => onClickPharmacy(pharmacyData),
  });
};

// Function to fetch the pharmacy data from the Mapbox API
const getPharmacy = async ({
  mapRef,
  locationCoords,
  token,
  markerRef,
  abortController,
  onClickPharmacy,
}: GetPharmacyProps & {
  onClickPharmacy: (pharmacyData: PharmacyDataProps) => void;
}): Promise<PharmacyDataProps[] | undefined> => {
  // Destructure the location coordinates
  const [lng, lat] = locationCoords;
  // Define the place type for the pharmacy
  const placeType = 'pharmacy';
  // Define the endpoint for the pharmacy data
  const endpoint = api({ placeType, lng, lat, token });
  markerRef.current.forEach((marker) => marker.remove());
  markerRef.current = [];

  try {
    const response = await fetch(endpoint, { signal: abortController.signal });
    const data = await response.json();
    // Process the pharmacy data and add markers to the map
    data.features.forEach((pharmacyData: PharmacyDataProps) => {
      processPharmacyData({
        map: mapRef.current!,
        pharmacyData,
        markerRef: markerRef,
        onClickPharmacy,
      });
    });
    return data.features;
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.log('Fetch aborted');
    } else {
      console.error('Error fetching pharmacy data:', error);
    }
  }
};

export default getPharmacy;
