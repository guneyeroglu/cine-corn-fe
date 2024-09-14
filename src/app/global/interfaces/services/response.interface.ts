export interface IResponse<T = null> {
  data: T;
  message: string;
  status: number;
}
