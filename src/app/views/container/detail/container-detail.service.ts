import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {CommonService} from '../../../@core/utils/common.service';


@Injectable({
  providedIn: 'root'
})
export class ContainerDetailService {

  constructor(private http: HttpClient) {
  }

  /**
   *  获取一个容器的基本信息
   * @param opts ID or name of the container
   */
  inspectContainer(opts) {
    return this.http.get(`http://localhost:3000/inspectContainer`, {params: opts}).pipe(
      catchError(CommonService.handleError)
    );
  }
}
