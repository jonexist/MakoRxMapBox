import 'bootstrap/dist/css/bootstrap.min.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import './styles/index.css';
import { ServiceSelection } from './pages/ServiceSelection';
import { Container } from 'react-bootstrap';
import { Navbar } from './components/ui/NavBar';
import { Provider } from './context/ServiceContext';
import { Footer } from './components/ui/Footer';

export const App = () => {
  return (
    <>
      <Navbar />
      <Provider>
        <Container
          className='min-vh-100'
          style={{
            paddingTop: '8.5rem',
          }}
        >
          <ServiceSelection />
        </Container>
        <Footer />
      </Provider>
    </>
  );
};

export default App;
