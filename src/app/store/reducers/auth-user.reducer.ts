import { createReducer, on } from '@ngrx/store';

import { IAuthUserState } from '../../global/interfaces';
import { setAuthUser } from '../actions';

export const initialAuthUser: IAuthUserState = {
  user: null,
  isLoading: true,
};

export const authUserReducer = createReducer(
  initialAuthUser,
  on(setAuthUser, (_, { user, isLoading }) => ({
    user,
    isLoading,
  })),
);
