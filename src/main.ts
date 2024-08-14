import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { CineCornAppComponent } from './app/app.component';

bootstrapApplication(CineCornAppComponent, appConfig).catch(err => console.error(err));
