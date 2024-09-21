import { Routes } from '@angular/router';

import { APP_ROUTES } from './global/enums';
import {
  CineCornHomeComponent,
  CineCornListDetailsComponent,
  CineCornListsComponent,
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
    path: APP_ROUTES.lists,
    component: CineCornListsComponent,
  },
  {
    path: APP_ROUTES.list_details,
    component: CineCornListDetailsComponent,
  },
  {
    path: APP_ROUTES.my_list,
    component: CineCornMyListComponent,
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
