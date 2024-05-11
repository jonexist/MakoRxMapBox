import mapboxgl from 'mapbox-gl';

export const addNavigationControl = (map: mapboxgl.Map) => {
  const navControl = new mapboxgl.NavigationControl();
  map.addControl(navControl, 'bottom-right');
};
