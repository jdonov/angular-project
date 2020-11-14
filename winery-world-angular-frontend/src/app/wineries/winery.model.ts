import {WineInterface} from '../wines/wine-interface';

export interface WineryModel {
  id: string;
  name: string;
  address: WineryAddress;
  description: string;
  imageUrl: string;
  wines: WineInterface[];
}


export interface WineriesModel {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface WineryAddress{
  region: string;
  city: string;
  street: string;
}
