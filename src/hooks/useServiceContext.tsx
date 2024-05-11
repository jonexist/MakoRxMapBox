import { useContext } from 'react';
import { ServiceContext } from '../context/ServiceContext';

export const useServiceContext = () => useContext(ServiceContext);
