import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { MyPreset } from './prime-theme';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()), provideAnimationsAsync(),
  providePrimeNG({
    theme: {
      preset: MyPreset,
      options: {
        darkModeSelector: '.app-dark',
        cssLayer: {
          name: 'primeng',
          order: 'tailwind-base,tailwind-utilities, primeng ',
        },
      },
    }
  })]
};
