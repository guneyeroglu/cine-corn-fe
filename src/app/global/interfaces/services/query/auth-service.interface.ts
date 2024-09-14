export interface IAuthUser {
  exp: number;
  role: {
    id: number;
    name: string;
  };
  userId: string;
  username: string;
}
