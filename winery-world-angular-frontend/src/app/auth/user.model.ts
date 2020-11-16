export class User {
  constructor(public id: string, public username: string, private token: string, private tokenExpirationDate: Date) {
  }
}
