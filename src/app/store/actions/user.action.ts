import { createAction, props } from '@ngrx/store';

import { ISetAuthUser } from '../../global/interfaces';

export const setAuthUser = createAction('[AuthUser] Set Function', props<ISetAuthUser>());
