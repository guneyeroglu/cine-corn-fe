import { Routes } from '@angular/router';

import { APP_ROUTES } from './global/enums';
import {
  FavoritesComponent,
  HomeComponent,
  ListDetailsComponent,
  ListsComponent,
  LoginComponent,
  MovieDetailsComponent,
  MoviesComponent,
  ProfileComponent,
  RegisterComponent,
} from './pages';

export const routes: Routes = [
  {
    path: APP_ROUTES.home,
    component: HomeComponent,
  },
  {
    path: APP_ROUTES.movies,
    component: MoviesComponent,
  },
  {
    path: APP_ROUTES.movie_details,
    component: MovieDetailsComponent,
  },
  {
    path: APP_ROUTES.favorites,
    component: FavoritesComponent,
  },
  {
    path: APP_ROUTES.lists,
    component: ListsComponent,
  },
  {
    path: APP_ROUTES.list_details,
    component: ListDetailsComponent,
  },
  {
    path: APP_ROUTES.profile,
    component: ProfileComponent,
  },
  {
    path: APP_ROUTES.login,
    component: LoginComponent,
  },
  {
    path: APP_ROUTES.register,
    component: RegisterComponent,
  },
];
