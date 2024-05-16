import Form from 'react-bootstrap/Form';

type ServicesDropdownProps = {
  services: string[];
};

export const ServicesDropdown = ({ services }: ServicesDropdownProps) => {
  return (
    <Form.Select
      aria-label='Default select example'
      className='w-25 filter__service___dropdown'
      defaultValue='Filter services'
    >
      <option disabled value='Filter services'>
        Filter services
      </option>
      {services.map((service, idx) => (
        <option key={idx} value={service}>
          {service}
        </option>
      ))}
    </Form.Select>
  );
};
