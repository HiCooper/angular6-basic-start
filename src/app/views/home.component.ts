import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AnalyticsService} from '../@core/utils/analytics.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

    isCollapsed = false;
    currentRouterUrl: string;

    constructor(private router: Router, private analytics: AnalyticsService) {
        this.currentRouterUrl = router.url;
    }

    ngOnInit() {
        this.analytics.trackEvent('bad thing!!!');
    }

}
