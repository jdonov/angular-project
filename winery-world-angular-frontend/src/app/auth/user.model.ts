export interface User {
  username: string;
  token: string;
  tokenExpirationDate: Date;
}

export interface UserServiceDTO {
  id: string;
  username: string;
}
