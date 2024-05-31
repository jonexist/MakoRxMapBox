import { Map, Marker, Popup } from 'mapbox-gl';
import { Button } from 'react-bootstrap';
import ReactDOMServer from 'react-dom/server';

type PopupProps = {
  pharmacyId: string;
  map: Map;
  marker: Marker;
  popupText: string;
  onClickPharmacy: (pharmacyId: string) => void;
};

type PopupEventProps = Omit<PopupProps, 'popupText'> & {
  popup: Popup;
};

// Function to add the popup event to the marker
const addPopupEvent = ({
  pharmacyId,
  map,
  marker,
  popup,
  onClickPharmacy,
}: PopupEventProps) => {
  // Add the event listener to the marker
  marker.getElement().addEventListener('click', () => {
    map.flyTo({
      center: marker.getLngLat(),
      zoom: map.getZoom(),
    });
    map.once('moveend', () => {
      popup.setLngLat(marker.getLngLat()).addTo(map);
      document
        .getElementById(`pharmacyId-${pharmacyId}`)
        ?.addEventListener('click', () => {
          onClickPharmacy(pharmacyId);
        });
    });
  });
  marker.getElement().addEventListener('close', () => {
    popup.remove();
  });
};

// Function to create the popup marker
export const PopupMarker = ({
  pharmacyId,
  map,
  marker,
  popupText,
  onClickPharmacy,
}: PopupProps) => {
  // Create the button element for the popup marker using ReactDOMServer
  const button = ReactDOMServer.renderToString(
    <Button
      variant='primary'
      size='sm'
      className='mt-2'
      id={`pharmacyId-${pharmacyId}`}
    >
      See Services Offered
    </Button>
  );

  // Create the popup element for the marker
  const popup = new Popup({ offset: 25 }).setHTML(`${popupText}<br>${button}`);

  // Set the popup to the marker
  marker.setPopup(popup);

  // Add the popup event to the marker
  addPopupEvent({
    pharmacyId,
    map,
    marker,
    popup,
    onClickPharmacy,
  });
};
