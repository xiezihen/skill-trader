export class User {
  constructor(
  public username: string,
  public password: string,
  public displayname: string,
  public email: string,
  public firstName?: string,
  public lastName?: string,
  public token?: string,
  public city?: string,
  public about?: string
  ) {}
}
