import { Image, NavbarBrand, Navbar as NavbarBs } from 'react-bootstrap';
import MakoRxLogo from '../../assets/MakoRx.svg';

export const Navbar = () => {
  return (
    <NavbarBs className='navbar__custom shadow-sm p-3 position-fixed w-100'>
      <NavbarBrand
        href='https://www.makorxcareconnect.com/'
        style={{ cursor: 'pointer' }}
      >
        <Image src={MakoRxLogo} alt='MakoRx Logo' fluid />
      </NavbarBrand>
    </NavbarBs>
  );
};
