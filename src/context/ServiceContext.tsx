import { ReactNode, createContext, useEffect, useState } from 'react';
import { pharmacyServices } from '../lib/data';
import { PharmacyDataProps, ServiceProps } from '../definition';

type ServiceProvider = {
  children: ReactNode;
};

type SelectedServices = ServiceProps;

type ServiceContextType = {
  listOfServices: ServiceProps[];
  selectedServices: SelectedServices[];
  selectedPharmacy: PharmacyDataProps | null;
  setSelectedServices: (services: SelectedServices[]) => void;
  setSelectedPharmacy: (pharmacy: PharmacyDataProps | null) => void;
  getItemQuantity: (id: string) => number;
  increaseItemQuantity: (id: string) => void;
  decreaseItemQuantity: (id: string) => void;
  toggleServiceSelection: (id: string) => void;
};

export const ServiceContext = createContext({} as ServiceContextType);

export const Provider = ({ children }: ServiceProvider) => {
  // This state stores the list of services with their initial values.
  const initialServiceState = pharmacyServices.map((service) => ({
    id: service.id,
    title: service.title,
    description: service.description,
    price: service.price,
    selected: false,
    quantity: 0,
  }));

  // These states store the list of services, selected services, and selected pharmacy.
  const [listOfServices, setListOfServices] =
    useState<ServiceProps[]>(initialServiceState);
  const [selectedServices, setSelectedServices] = useState<SelectedServices[]>(
    []
  );
  const [selectedPharmacy, setSelectedPharmacy] =
    useState<PharmacyDataProps | null>(null);

  // This effect resets the list of services and selected services when a new pharmacy is selected.
  useEffect(() => {
    setListOfServices((prev) =>
      prev.map((item) => ({ ...item, selected: false, quantity: 0 }))
    );
    setSelectedServices([]);
  }, [selectedPharmacy]);

  // This function returns the quantity of the service with the given id.
  const getItemQuantity = (id: string) => {
    const item = listOfServices.find((service) => service.id === id);
    return item?.quantity || 0;
  };

  // This function increases the quantity of the service with the given id.
  const increaseItemQuantity = (id: string) => {
    setListOfServices((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 0) + 1 } : item
      )
    );
  };

  // This function decreases the quantity of the service with the given id.
  const decreaseItemQuantity = (id: string) => {
    setListOfServices((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max((item.quantity || 0) - 1, 0),
              selected: (item.quantity || 0) > 1,
            }
          : item
      )
    );
  };

  // This function toggles the selection of the service with the given id.
  // It also sets the quantity to 1 if the service is selected.
  const toggleServiceSelection = (id: string) => {
    setListOfServices((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              selected: !item.selected,
              quantity: 1,
            }
          : item
      )
    );
  };

  return (
    <ServiceContext.Provider
      value={{
        listOfServices,
        selectedServices,
        selectedPharmacy,
        setSelectedServices,
        setSelectedPharmacy,
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        toggleServiceSelection,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
