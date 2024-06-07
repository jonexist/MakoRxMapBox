import { Card, CardSubtitle, CardText, CardTitle } from 'react-bootstrap';
import { ServiceProps } from '../../definition';
import { formatCurrency } from '../../utils/formatCurrency';
import React from 'react';

type TotalPriceProps = {
  services: ServiceProps[];
  total: number;
};

export const TotalPrice: React.FC<TotalPriceProps> = ({ services, total }) => {
  return (
    <Card>
      <Card.Body>
        <CardTitle className='mb-3'>Selected Tests & Services</CardTitle>
        {services.map((service) => {
          const quantity = service.quantity || 0;
          return (
            <div
              key={service.id}
              className='d-flex align-items-center justify-content-between'
            >
              <CardText>{service.title}</CardText>
              <CardText>
                {formatCurrency(service.price * quantity)}{' '}
                <sup>x{quantity}</sup>
              </CardText>
            </div>
          );
        })}
        <div className='d-flex justify-content-between subtotal'>
          <CardSubtitle className='text-uppercase fw-bold mt-3'>
            Total
          </CardSubtitle>
          <CardSubtitle className='fw-bold mt-3'>
            {formatCurrency(total)}
          </CardSubtitle>
        </div>
      </Card.Body>
    </Card>
  );
};
