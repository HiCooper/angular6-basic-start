import {Component, OnInit} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd';
import {ActivatedRoute} from '@angular/router';
import {ContainerDetailService} from './container-detail.service';

@Component({
  selector: 'app-container-detail',
  templateUrl: './container-detail.component.html',
  styleUrls: ['./container-detail.component.less']
})
export class ContainerDetailComponent implements OnInit {

  inspectInfo: any;

  constructor(
    private notification: NzNotificationService,
    private route: ActivatedRoute,
    private service: ContainerDetailService,
  ) {
  }

  ngOnInit() {
    const queryParams = this.route.queryParams['value'];
    this.inspectContainer(queryParams.id);
  }

  /**
   *  获取一个容器的基本信息
   * @param id 容器id
   */
  inspectContainer(id) {
    this.service.inspectContainer({id: id}).subscribe((res: any) => {
      if (res && res.statusCode === 404) {
        this.notification.create('error', '失败', 'id=' + id.substr(0, 12) + '信息获取失败！<br>' + '原因：' + res.reason);
      } else {
        this.inspectInfo = res;
      }
    }, error => {
      console.error(error);
    });
  }
}
