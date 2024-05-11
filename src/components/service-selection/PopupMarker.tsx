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

const addPopupEvent = ({
  pharmacyId,
  map,
  marker,
  popup,
  onClickPharmacy,
}: PopupEventProps) => {
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

export const PopupMarker = ({
  pharmacyId,
  map,
  marker,
  popupText,
  onClickPharmacy,
}: PopupProps) => {
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

  const popup = new Popup({ offset: 25 }).setHTML(`${popupText}<br>${button}`);

  marker.setPopup(popup);

  addPopupEvent({
    pharmacyId,
    map,
    marker,
    popup,
    onClickPharmacy,
  });
};
