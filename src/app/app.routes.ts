import { Routes } from '@angular/router';

import { APP_ROUTES } from './global/enums';
import {
  CineCornFavoritesComponent,
  CineCornHomeComponent,
  CineCornLoginComponent,
  CineCornMovieDetailsComponent,
  CineCornMoviesComponent,
  CineCornMyListComponent,
  CineCornRegisterComponent,
} from './pages';
import { AuthGuard } from './components/auth-guard/auth-guard.component';

export const routes: Routes = [
  {
    path: APP_ROUTES.home,
    component: CineCornHomeComponent,
  },
  {
    path: APP_ROUTES.movies,
    component: CineCornMoviesComponent,
  },
  {
    path: APP_ROUTES.movie_details,
    component: CineCornMovieDetailsComponent,
  },
  {
    path: APP_ROUTES.my_list,
    component: CineCornMyListComponent,
  },
  {
    path: APP_ROUTES.favorites,
    component: CineCornFavoritesComponent,
  },
  {
    path: APP_ROUTES.login,
    component: CineCornLoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: APP_ROUTES.register,
    component: CineCornRegisterComponent,
    canActivate: [AuthGuard],
  },
];
