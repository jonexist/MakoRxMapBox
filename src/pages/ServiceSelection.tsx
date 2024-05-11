import { useMapBox } from '../hooks/useMapBox';
import { HeaderWithSubtitle } from '../components/ui/HeaderWithSubtitle';
import { useState, useEffect } from 'react';
import { useServiceContext } from '../hooks/useServiceContext';
import { pharmacyServices } from '../lib/data';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { SelectedPharmacy } from '../components/service-selection/SelectedPharmacy';
import { ServiceCard } from '../components/service-selection/ServiceCard';
import { v4 as uuidv4 } from 'uuid';

export const ServiceSelection = () => {
  // These states store the loading status and the selected pharmacy.
  const [isLoading, setIsLoading] = useState(false);
  const { mapContainer, pharmacyDataOnClick } = useMapBox();
  const { listOfServices, selectedPharmacy, setSelectedPharmacy } =
    useServiceContext();

  // This effect sets the selected pharmacy and its services when a pharmacy is clicked.
  useEffect(() => {
    if (pharmacyDataOnClick) {
      setIsLoading(true);
      setSelectedPharmacy({
        ...pharmacyDataOnClick,
        services: pharmacyServices,
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [pharmacyDataOnClick, setSelectedPharmacy]);

  // This constant filters the selected services from the list of services.
  const allSelectedServices = listOfServices.filter(
    (service) => service.selected
  );

  return (
    <div>
      <HeaderWithSubtitle
        title='Book an Appointment'
        subtitle='Book your pharmacy visit - MAKO Rx Care Connect works together to provide you special services and testing.'
        hasHr={true}
      />

      <div ref={mapContainer} className='mapboxgl' />
      <Row className='mt-4'>
        {selectedPharmacy ? (
          <>
            <Col>
              <HeaderWithSubtitle subtitle='Selected Pharmacy' />
              <SelectedPharmacy data={selectedPharmacy} />
            </Col>
            <Col lg={8}>
              <div>
                {isLoading ? (
                  <div className='d-flex justify-content-center align-items-center gap-1 mt-3'>
                    <Spinner
                      variant='primary'
                      animation='border'
                      size='sm'
                      role='status'
                    />
                    <span>Retrieving Service Information...</span>
                  </div>
                ) : (
                  <>
                    <HeaderWithSubtitle
                      subtitle={`Available Tests & Services in ${selectedPharmacy.text}`}
                    />
                    <Row xl={2}>
                      {/* Render a list of services offered by the selected pharmacy. */}
                      {selectedPharmacy.services.map((service) => (
                        <Col key={uuidv4()} className='mb-3'>
                          <ServiceCard
                            data={{
                              ...selectedPharmacy,
                              availableServices: service,
                            }}
                          />
                        </Col>
                      ))}
                    </Row>
                  </>
                )}
                {isLoading ? null : allSelectedServices.length > 0 ? (
                  <div className='mt-3 d-flex justify-content-end'>
                    <Button
                      variant='primary'
                      onClick={() => console.log('Proceed to Checkout')}
                    >
                      Proceed to next step
                    </Button>
                  </div>
                ) : (
                  <div className='text-center mt-3'>
                    <p className='text-muted'>No services selected</p>
                  </div>
                )}
              </div>
            </Col>
          </>
        ) : (
          <Col className='text-center'>
            <p className='text-muted'>Select a pharmacy to view services</p>
          </Col>
        )}
      </Row>
    </div>
  );
};
