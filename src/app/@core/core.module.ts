import {AnalyticsService} from './utils/analytics.service';
import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';

export const coreProvider = [
  AnalyticsService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [],
  declarations: [],
})

export class CoreModule {

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...coreProvider,
      ],
    };
  }
}
