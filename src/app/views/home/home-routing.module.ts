import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {ContainerComponent} from '../container/container.component';
import {ContainerDetailComponent} from '../container/detail/container-detail.component';

const homeRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'container',
    component: ContainerComponent,
  },
  {
    path: 'container-detail',
    component: ContainerDetailComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule {
}
