import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
    {
        path: 'home',
        loadChildren: './views/home.module#HomeModule'
    },
    {
        path: '',
        redirectTo: 'home/dashboard',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'home'
    },
];


@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
