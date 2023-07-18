import { Observable } from 'rxjs';

export interface OrderType {
  id: number;
  person: OrderPersonType;
  services: {
    deathNotice: OrderServiceType;
    memorialPage: OrderServiceType;
    donation: OrderServiceType;
    flowerShop: OrderServiceType;
  };
  ceremony?: OrderCeremonyType;
}

export interface OrderPersonType {
  photoUrl?: string;
  firstName: string;
  lastName: string;
  birthdate?: string;
  birthYear: string;
  deathdate?: string;
  deathYear: string;
  deathcity?: string;
}

export interface OrderServiceType {
  label?: string | Observable<string>;
  url?: string;
  disabled?: boolean;
}

export interface OrderCeremonyType {
  dateTime: string;
  location: string;
  hideCeremonyDate: boolean;
}
