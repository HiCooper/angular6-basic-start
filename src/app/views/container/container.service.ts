import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {CommonService} from '../../share/common.service';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  constructor(
    private http: HttpClient,
  ) {
  }

  /**
   * 根据条件获取获取容器
   * @param opts size,filters,limit
   */
  getContainersByOpts(opts) {
    const params = new HttpParams({fromObject: opts});
    return this.http.get(`http://localhost:3000/getContainersByOpts`, {params: params}).pipe(
      // retry(3), // retry a failed request up to 3 times
      catchError(CommonService.handleError)
    );
  }

  /**
   *  根据名字或id启动容器
   * @param opts ID or name of the container
   */
  startContainer(opts) {
    console.log(opts);
    return this.http.post(`http://localhost:3000/startContainer`, opts).pipe(
      catchError(CommonService.handleError)
    );
  }

  /**
   *  根据名字或id重启容器
   * @param opts ID or name of the container
   */
  restartContainer(opts) {
    console.log(opts);
    return this.http.post(`http://localhost:3000/restartContainer`, opts).pipe(
      catchError(CommonService.handleError)
    );
  }

  /**
   * 根据名字或id停止某个容器
   * @param opts ID or name of the container
   */
  stopContainer(opts) {
    console.log(opts);
    return this.http.post(`http://localhost:3000/stopContainer`, opts).pipe(
      catchError(CommonService.handleError)
    );
  }

  /**
   * 批量停止容器
   * @param opts 容器id列表
   */
  stopContainerBatch(opts) {
    console.log(opts);
    return this.http.post(`http://localhost:3000/stopRunningContainersBatch`, opts).pipe(
      catchError(CommonService.handleError)
    );
  }

  /**
   * 根据名字或id删除某个容器
   * @param opts ID or name of the container
   */
  removeContainer(opts) {
    console.log(opts);
    return this.http.post(`http://localhost:3000/removeContainer`, opts).pipe(
      catchError(CommonService.handleError)
    );
  }
}
