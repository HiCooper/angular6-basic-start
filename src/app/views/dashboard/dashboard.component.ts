import {Component} from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent {

    date = null; // new Date();

    onChange(result: Date): void {
        console.log('onChange: ', result);
    }
}
