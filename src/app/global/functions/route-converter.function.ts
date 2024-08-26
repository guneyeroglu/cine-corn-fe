import { APP_ROUTES } from '../enums';

export function routeConverter(route: APP_ROUTES[keyof APP_ROUTES]): string {
  return `/${route}`;
}
