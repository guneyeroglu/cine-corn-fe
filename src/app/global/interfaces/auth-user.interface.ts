import { IAuthUser } from './services/query';

export interface IAuthUserState {
  user: IAuthUser | null;
}

export interface ISetAuthUser extends IAuthUserState {}
