import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  isCollapsed = false;
  currentRouterUrl: string;
  constructor(private router: Router) {
    this.currentRouterUrl = router.url;
  }

  ngOnInit() {
  }

}
