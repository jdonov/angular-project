export interface WineryModel {
  id: string;
  name: string;
  address: WineryAddress;
  description: string;
  imageUrl: string;
}

export interface WineryAddress{
  region: string;
  city: string;
  street: string;
}
