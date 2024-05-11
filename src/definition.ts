export type MapboxEndpoint = {
  placeType: string;
  token: string;
  lng: number;
  lat: number;
};

export type ServiceProps = {
  id: string;
  title: string;
  description: string;
  price: number;
  selected?: boolean;
  quantity?: number;
};

export type PharmacyDataProps = {
  id: string;
  place_name: string;
  text: string;
  geometry: {
    coordinates: [number, number];
  };
  properties: {
    address: string;
    category: string;
    foursquare: string;
    landmark: boolean;
    maki: string;
  };
  services: ServiceProps[];
};

export type MapStateProps = {
  lng: number;
  lat: number;
  zoom?: number;
};
