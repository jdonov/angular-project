export interface OrderPlaceBindingDTO{
  orderedWines: OrderWineView[];
  receiverAddress: AddressUserBindingDTO;
}

export interface OrderWineBindingDTO{
  id: string;
  quantity: number;
}

export interface OrderWineView extends OrderWineBindingDTO{
  name: string;
  wineryName: string;
  price: number;
}
export interface AddressUserBindingDTO{
  city: string;
  street: string;
}

export interface OrderServiceDTO{
  id: string;
  wines: OrderWineServiceDTO[];
  receiverAddress: AddressUserBindingDTO;
  orderDateTime: Date;
  status: string;
}

export interface OrderWineServiceDTO{
  wineId: string;
  name: string;
  quantity: number;
  price: number;
}
