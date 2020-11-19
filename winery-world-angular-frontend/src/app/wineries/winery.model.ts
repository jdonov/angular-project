import {WineServiceDTO} from '../wines/wine.model';

export interface WineryDetailsServiceDTO {
  id: string;
  name: string;
  address: AddressServiceDTO;
  description: string;
  imageUrl: string;
  wines: WineServiceDTO[];
  owner: string;
}


export interface WineryServiceDTO {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  owner: string;
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

export interface WineryEditBindingDTO {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  address: AddressServiceDTO;
}
