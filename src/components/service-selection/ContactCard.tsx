import { CardText } from 'react-bootstrap';

type ContactProps = {
  email: string;
  phone: string;
  area: string;
  hours: string;
};

type ContactFieldProps = {
  label: keyof ContactProps;
  value: string;
  isLink?: boolean;
};

const ContactField = ({ label, value, isLink }: ContactFieldProps) => {
  const href =
    label === 'email'
      ? `mailto:${value}`
      : label === 'phone'
      ? `tel:${value}`
      : undefined;

  return (
    <div className='d-flex gap-2'>
      <CardText className='contact text-capitalize'>{label}:</CardText>
      <CardText className='contact' style={{ fontWeight: '500' }}>
        {isLink ? (
          <a href={href} className='text-decoration-none'>
            {value}
          </a>
        ) : (
          value
        )}
      </CardText>
    </div>
  );
};

export const ContactCard = ({ area, hours, email, phone }: ContactProps) => {
  return (
    <>
      <ContactField label='area' value={area} />
      <ContactField label='hours' value={hours} />
      <ContactField label='email' value={email} isLink />
      <ContactField label='phone' value={phone} isLink />
    </>
  );
};
