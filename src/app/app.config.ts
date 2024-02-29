import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { APP_ROUTES } from './app.routes';
import { TaskService } from './tasks/services/task.service';

import { provideNativeDateAdapter } from '@angular/material/core';



//import localeDe from '@angular/common/locales/de';



//registerLocaleData(localeDe, localeDeExtra);
// export function provideLocaleConfig(): Provider[] {
//   registerLocaleData(localePt);
//   return [
//     {
//       provide: LOCALE_ID,
//       useValue: 'fr-FR',
//     }
//   ];
// }

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(APP_ROUTES),
              provideClientHydration(),
              provideAnimationsAsync(),
              TaskService,
              importProvidersFrom(HttpClientModule),
              provideHttpClient(withFetch()),
              provideNativeDateAdapter(),

              ]
};


