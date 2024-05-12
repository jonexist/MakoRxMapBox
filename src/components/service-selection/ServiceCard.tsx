import { Card, CardText, Form } from 'react-bootstrap';
import { useServiceContext } from '../../hooks/useServiceContext';
import { PharmacyDataProps, ServiceProps } from '../../definition';
import { formatCurrency } from '../../utils/formatCurrency';

type ServiceCardProps = {
  data: PharmacyDataProps & { availableServices: ServiceProps };
};

export const ServiceCard = ({ data }: ServiceCardProps) => {
  const {
    listOfServices,
    getItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
    toggleServiceSelection,
  } = useServiceContext();

  const service = data.availableServices;
  const isSelected = listOfServices.find(
    (item) => item.id === service.id
  )?.selected;

  return (
    <div style={{ cursor: 'pointer' }}>
      <Card
        onClick={() => toggleServiceSelection(service.id)}
        style={{ backgroundColor: isSelected ? '#E8F7FF' : 'white' }}
      >
        <Card.Body>
          <div className='d-flex align-items-center justify-content-between'>
            <CardText className='fw-bold'>{service.title}</CardText>
            <CardText>{formatCurrency(service.price)}</CardText>
          </div>
          <CardText className='text-truncate fs-6'>
            {service.description}
          </CardText>
          <div
            className={
              isSelected
                ? `d-flex justify-content-between`
                : `d-flex justify-content-end`
            }
          >
            {isSelected && (
              <div className='counter'>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    decreaseItemQuantity(service.id);
                  }}
                  className='counter__btn'
                  disabled={!isSelected}
                >
                  &#8722;
                </button>
                <span className='counter__display'>
                  {getItemQuantity(service.id)}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    increaseItemQuantity(service.id);
                  }}
                  className='counter__btn'
                  disabled={!isSelected}
                >
                  &#43;
                </button>
              </div>
            )}

            <Form.Check
              inline
              label='Select'
              id={`select-${service.id}`}
              type='checkbox'
              onChange={(e) => e.stopPropagation()}
              checked={isSelected}
            />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
