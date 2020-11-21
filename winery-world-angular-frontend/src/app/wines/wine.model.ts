export interface WineServiceDTO {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  rating: number;
  yourRating: number;
}

export interface WineRate{
  rating: string;
  wineId: string;
  wineryId: string;
}

export interface WineRegisterDTO {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  wineryId: string;
}

export interface WineUpdateDTO {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}
