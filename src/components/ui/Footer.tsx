import { Col, Container, Row } from 'react-bootstrap';

const getFullYear = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer className='bg-light text-center text-lg-start mt-4'>
      <Container className='p-4'>
        <Row>
          <Col lg={12} className='text-center text-muted'>
            {`\u00A9 ${getFullYear} MakoRx Care Connect. All Rights Reserved.`}
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
