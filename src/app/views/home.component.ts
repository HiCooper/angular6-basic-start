import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AnalyticsService} from '../@core/utils/analytics.service';
import {en_US, NzI18nService, zh_CN} from 'ng-zorro-antd';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {


    constructor(private router: Router, private analytics: AnalyticsService, private i18n: NzI18nService) {
        this.currentRouterUrl = router.url;
    }

    isCollapsed = false;
    currentRouterUrl: string;
    isEnglish = false;

    private static setLanguage(language: string): string {
        localStorage.setItem('language', language);
        return localStorage.getItem('language');
    }

    private static checkEnglish(): boolean {
        let language = localStorage.getItem('language');
        if (!language) {
            // 没有设置过语言 默认初始化为中文环境
            language = HomeComponent.setLanguage('zh_CN');
        }
        return language === 'en_US';
    }

    ngOnInit() {
        // this.analytics.trackEvent('bad thing!!!');
        this.isEnglish = HomeComponent.checkEnglish();
    }

    changeLanguage(): void {
        this.i18n.setLocale(this.isEnglish ? en_US : zh_CN);
        HomeComponent.setLanguage(this.isEnglish ? 'en_US' : 'zh_CN');
    }
}
