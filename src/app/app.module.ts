import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';

import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {CoreModule} from './@core/core.module';
import {ThemeModule} from './@theme/theme.module';

registerLocaleData(zh);

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        CoreModule,
        ThemeModule
    ],
    bootstrap: [AppComponent],
    providers: []
})
export class AppModule {
}
