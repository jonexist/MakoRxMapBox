import mapboxgl, { GeolocateControl, Map } from 'mapbox-gl';

type UserLocationProps = {
  map: Map;
  geolocateRef: React.MutableRefObject<GeolocateControl | null>;
};

const addGeolocateControl = ({ map, geolocateRef }: UserLocationProps) => {
  const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
  });

  map.addControl(geolocate);
  geolocateRef.current = geolocate;
};

export default addGeolocateControl;
