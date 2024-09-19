import { IAuthUser } from './services/query';

export interface IAuthUserState {
  user: IAuthUser | null;
  isLoading: boolean;
}

export interface ISetAuthUser extends IAuthUserState {}
