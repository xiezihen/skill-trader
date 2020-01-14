export class Response {
  constructor(
  public status: string,
  public message: string,
  public err: JSON
  ) {}
}
