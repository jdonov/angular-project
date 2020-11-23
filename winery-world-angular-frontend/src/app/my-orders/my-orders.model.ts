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
}
export interface AddressUserBindingDTO{
  city: string;
  street: string;
}

export interface OrderServiceDTO{
  wines: OrderWineServiceDTO[];
  receiverAddress: AddressUserBindingDTO;
  orderDateTime: Date;
  status: string;
}

export interface OrderWineServiceDTO{
  wineId: string;
  name: string;
  quantity: number;
}