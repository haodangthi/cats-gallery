import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { HttpClientModule } from '@angular/common/http'
import {
  provideAnimations,
  provideNoopAnimations,
} from '@angular/platform-browser/animations'
import { CatState } from './state'
import { NgxsModule } from '@ngxs/store'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideNoopAnimations(),
    importProvidersFrom(
      HttpClientModule,
      NgxsModule.forRoot([CatState])
    ),
  ],
}
