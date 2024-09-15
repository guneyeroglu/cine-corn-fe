import { createAction, props } from '@ngrx/store';

import { ISetSnackbarAction } from '../../global/interfaces';

export const setSnackbar = createAction('[Snackbar] Set Function', props<ISetSnackbarAction>());
export const onCloseSnackbar = createAction('[Snackbar] Close Function');
