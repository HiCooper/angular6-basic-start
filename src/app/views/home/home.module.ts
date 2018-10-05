import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {HomeRoutingModule} from './home-routing.module';

import {DashboardComponent} from '../dashboard/dashboard.component';
import {ContainerComponent} from '../container/container.component';
import {ContainerDetailComponent} from '../container/detail/container-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    NgZorroAntdModule,
  ],
  declarations: [
    DashboardComponent,
    ContainerComponent,
    ContainerDetailComponent, 
  ],
  providers: [{provide: NZ_I18N, useValue: zh_CN}]
})
export class HomeModule {
}
