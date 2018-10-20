import {AnalyticsService} from './utils/analytics.service';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {CapitalizePipe, PluralPipe, RoundPipe, TimingPipe} from './pipes';

export const corePipe = [
    CapitalizePipe,
    PluralPipe,
    RoundPipe,
    TimingPipe,
];

export const coreProvider = [
    AnalyticsService,
];

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [...corePipe],
    declarations: [...corePipe],
    providers: [
        ...coreProvider,
    ]
})

export class CoreModule {
}
