import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ContainerService} from './container.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {CommonService} from '../../share/common.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.less']
})
export class ContainerComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private containerService: ContainerService,
    private notification: NzNotificationService,
  ) {
  }

  validateForm: FormGroup;
  // 容器列表
  containerList = [];
  showContainerList = [];
  ids: Array<string> = [];
  names: Array<string> = [];
  // created|restarting|running|removing|paused|exited|dead
  status: Array<string> = [];
  controlArray = [];
  // 搜索loading
  searchLoading = false;
  allChecked = false;
  indeterminate = false;

  refreshStatus(): void {
    const allChecked = this.showContainerList.every(value => value['checked'] === true);
    const allUnChecked = this.showContainerList.every(value => !value['checked']);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }

  resetForm(): void {
    this.ids = [];
    this.names = [];
    this.validateForm.reset();
    this.getContainerList();
  }

  checkAll(value: boolean): void {
    this.showContainerList.forEach(data => data['checked'] = value);
    this.refreshStatus();
  }

  goSearch() {
    this.searchLoading = true;
    console.log(this.validateForm.value);
    const searchCondition = this.validateForm.value;
    this.ids = this.names = this.status = [];
    let tempShowData = this.containerList;
    if (searchCondition.id && searchCondition.id.trim()) {
      tempShowData = tempShowData.filter(v => v.Id.indexOf(searchCondition.id.trim()) !== -1);
    }
    if (searchCondition.name && searchCondition.name.trim()) {
      tempShowData = tempShowData.filter(v => {
        return v.Names && v.Names.length && !!(v.Names.filter(t => t.indexOf(searchCondition.name.trim()) !== -1).length);
      });
    }
    if (searchCondition.status && searchCondition.status.trim()) {
      tempShowData = tempShowData.filter(v => v.State === searchCondition.status.trim());
    }
    this.showContainerList = tempShowData;
    if (!searchCondition.status && !searchCondition.id && !searchCondition.name) {
      this.getContainerList();
    }
    this.searchLoading = false;
  }

  getContainerList() {
    const opts = {
      all: true,
      size: true
    };
    const afterHandleParams = CommonService.handlerParams(opts);
    this.containerService.getContainersByOpts(afterHandleParams)
      .subscribe((res: any) => {
        if (res && res.statusCode === 500) {
          this.notification.create('error', '失败', '刷新容器列表失败！<br>' + '原因：' + res.reason);
          return;
        }
        this.containerList = res;
        this.showContainerList = res;
        if (this.containerList && this.containerList.length) {
          this.refreshStatus();
        }
      }, error => {
        console.error(error);
      });
  }

  /**
   * 批量停止运行容器
   */
  stopCheckedContainer() {
    const tempToDelete = this.showContainerList.map(value => {
      if (value['checked'] === true) {
        return value.Id;
      }
    }).filter(v => !!v);
    console.log(tempToDelete);
    this.containerService.stopContainerBatch(tempToDelete).subscribe((res: any) => {
      console.log(res);
      if (res && res.statusCodes) {
        this.notification.create('error', '失败', '批量停止容器失败！<br>' + '原因：' + res.reason);
      } else if (!res) {
        this.notification.create('success', '成功', '批量停止容器成功！');
        this.getContainerList();
      }
    }, error => {
      console.error(error);
    });
  }

  removeAllExitedContainer() {
  }

  /**
   * 停止某个正在运行的容器
   * @param id 容器id
   */
  stopContainer(id) {
    const opts = {
      id: id,
      // 延迟 1 s后 停止
      delayTime: 1
    };
    this.containerService.stopContainer(opts).subscribe((res: any) => {
      console.log(res);
      if (res && res.id && res.defaultOptions) {
        this.notification.create('success', '成功', 'id=' + id.substr(0, 12) + '的容器已成功停止运行！');
        this.getContainerList();
      } else {
        this.notification.create('error', '失败', 'id=' + id.substr(0, 12) + '的容器停止失败！<br>' + '原因：' + res.reason);
      }
    }, error => {
      console.error(error);
    });
  }

  /**
   * 启动某个正在运行的容器
   * @param id 容器id
   */
  startContainer(id) {
    this.containerService.startContainer({id: id}).subscribe((res: any) => {
      console.log(res);
      if (res && res.id && res.defaultOptions) {
        this.notification.create('success', '成功', 'id=' + id.substr(0, 12) + '的容器已成功运行！');
        this.getContainerList();
      } else {
        this.notification.create('error', '失败', 'id=' + id.substr(0, 12) + '的容器启动失败！<br>' + '原因：' + res.reason);
      }
    }, error => {
      console.error(error);
    });
  }

  /**
   * 根据名字或id重启容器
   * @param id 容器id
   */
  restartContainer(id) {
    this.containerService.restartContainer({id: id}).subscribe((res: any) => {
      console.log(res);
      if (res && res.id && res.defaultOptions) {
        this.notification.create('success', '成功', 'id=' + id.substr(0, 12) + '的容器已成功重启！');
        this.getContainerList();
      } else {
        this.notification.create('error', '失败', 'id=' + id.substr(0, 12) + '的容器重启失败！<br>' + '原因：' + res.reason);
      }
    }, error => {
      console.error(error);
    });
  }

  /**
   * 根据id删除容器
   * @param id 容器id
   */
  removeContainer(id) {
    const opts = {
      id: id,
      // 是否同时删除关联的volumes,不传默认false
      v: false,
      // 如果容器在运行，先kill容器再remove,不传默认false
      force: false,
      // 是否同时删除关联的specified link,不传默认false
      link: false,
    };
    this.containerService.removeContainer(opts).subscribe((res: any) => {
      console.log(res);
      if (!res) {
        this.notification.create('success', '成功', 'id=' + id.substr(0, 12) + '的删除已成功删除！');
        this.getContainerList();
      } else if (res && res.statusCode === 409 && res.json) {
        this.notification.create('error', '失败', 'id=' + id.substr(0, 12) + '的容器删除失败！<br>' + '原因：' + res.json.message);
      } else if (res && res.statusCode) {
        this.notification.create('error', '失败(' + res.statusCode + ')', 'id=' + id.substr(0, 12) + '的容器删除失败！<br>' + '原因：' + res.reason);
      } else {
        this.notification.create('error', '失败', 'id=' + id.substr(0, 12) + '的容器删除失败！<br>' + '原因：未知');
      }
    }, error => {
      console.error(error);
    });
  }


  ngOnInit(): void {
    // 初始化获取容器列表
    this.getContainerList();
    this.validateForm = this.fb.group({});
    // 搜索条件输入表单
    const searchCondition = [
      {
        label: '容器ID',
        prop: 'id',
        index: 1
      },
      {
        label: '容器名称',
        prop: 'name',
        index: 2
      },
      {
        label: '容器状态',
        prop: 'status',
        index: 3,
        type: 'select'
      }
    ];
    this.controlArray = this.controlArray.concat(searchCondition);
    const nameList = searchCondition.map(v => v.prop);
    nameList.forEach(label => {
      this.validateForm.addControl(label, new FormControl());
    });
  }
}
