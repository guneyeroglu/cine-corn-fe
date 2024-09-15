import { STATUS_TYPE } from '../enums';

export interface ISnackbarState {
  open: boolean;
  text: string;
  statusType: keyof typeof STATUS_TYPE;
  duration?: number;
}

export interface ISetSnackbarAction extends ISnackbarState {}
