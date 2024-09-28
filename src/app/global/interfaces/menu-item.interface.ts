import { APP_ROUTES } from '../enums';

export interface IMenuItem {
  name: string;
  path: APP_ROUTES[keyof APP_ROUTES];
  icon: string;
}
