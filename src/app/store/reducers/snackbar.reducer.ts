import { createReducer, on } from '@ngrx/store';

import { ISnackbarState } from '../../global/interfaces';
import { STATUS_TYPE } from '../../global/enums';
import { setSnackbar, onCloseSnackbar } from '../actions';

export const initialSnackbarState: ISnackbarState = {
  open: false,
  text: '',
  statusType: STATUS_TYPE.info,
  duration: 3000,
};

export const snackbarReducer = createReducer(
  initialSnackbarState,
  on(setSnackbar, (state: ISnackbarState, { open, statusType, text, duration = 3000 }) => ({
    ...state,
    open,
    statusType,
    text: text ?? state.text,
    duration,
  })),
  on(onCloseSnackbar, (state: ISnackbarState) => ({
    ...state,
    open: false,
  })),
);
