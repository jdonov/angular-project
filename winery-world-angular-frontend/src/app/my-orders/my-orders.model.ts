export interface OrderPlaceBindingDTO{
  orderedWines: OrderWineView[];
  username: string;
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
