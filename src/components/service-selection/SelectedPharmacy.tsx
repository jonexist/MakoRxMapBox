import { Button, Card, CardSubtitle, CardTitle } from 'react-bootstrap';
import { PharmacyDataProps } from '../../definition';
import { ContactCard } from './ContactCard';

type SelectedPharmacyProps = {
  data: PharmacyDataProps;
};

export const SelectedPharmacy = ({ data }: SelectedPharmacyProps) => {
  return (
    <Card>
      <Card.Body>
        <CardTitle className='mt-2 fw-bold'>{data.text}</CardTitle>
        <CardSubtitle className='mb-3'>{data.place_name}</CardSubtitle>
        <ContactCard
          area='1188 Jojeko View'
          hours='8:00 AM to 10:00 PM'
          email='defu@ewen.ar'
          phone='(807) 447-2197'
        />
        <div className='mt-3'>
          <Button variant='primary' className='me-2'>
            Website
          </Button>
          <Button variant='primary'>Call</Button>
        </div>
      </Card.Body>
    </Card>
  );
};
