import {WineInterface} from '../wines/wine-interface';

export interface WineryDetailsServiceDTO {
  id: string;
  name: string;
  address: AddressServiceDTO;
  description: string;
  imageUrl: string;
  wines: WineInterface[];
  owner: string;
}


export interface WineryServiceDTO {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface AddressServiceDTO{
  region: string;
  city: string;
  street: string;
}

export interface WineryRegisterBindingDTO {
  name: string;
  description: string;
  imageUrl: string;
  address: AddressServiceDTO;
}
