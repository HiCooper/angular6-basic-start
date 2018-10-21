import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {isBoolean, isNumber, isObject, isString} from 'util';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor() {
    }

    /**
     * 处理请求异常
     * @param error 错误信息
     */
    static handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }

    /**
     * 处理请求参数对象，
     * 返回类型：
     * {
     *     key: string,
     *     key2: string,
     *     key3: string,
     * }
     * @param opts 待处理对象
     */
    static handlerParams(opts): any {
        const temp = this.filterNull(opts);
        const keys = Object.keys(temp);
        const values = Object.values(temp);
        const result = {};
        values.forEach((v, index) => {
            if (v !== null && (!(isString(v) || isNumber(v) || isBoolean(v)))) {
                result[keys[index]] = JSON.stringify(v);
            } else {
                result[keys[index]] = v;
            }
        });
        return result;
    }

    /**
     * 过滤对象中的空值，如 '' , null , undefined , []
     * @param opts 待处理对象
     */
    static filterNull(opts): any {
        const temp = {};
        for (const i in opts) {
            if (!!opts && !!opts[i]) {
                if (isObject(opts[i]) && !Array.isArray(opts[i])) {
                    opts[i] = this.filterNull(opts[i]);
                } else if (Array.isArray(opts[i])) {
                    opts[i] = opts[i].filter(v => v !== '');
                }
            }
            if (!(opts[i] === '' || opts[i] === null || opts[i] === undefined || (Array.isArray(opts[i]) && !opts[i].length))) {
                temp[i] = opts[i];
            }
        }
        return temp;
    }

    /**
     * 全角转半角(去除所有空格或制表符)
     * @param str 待处理字符串
     */
    static toCDB(str: string): string {
        let tmp = '';
        for (let i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375) {
                tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
            } else {
                tmp += String.fromCharCode(str.charCodeAt(i));
            }
        }
        return tmp.trim().replace(/\s/g, '');
    }
}
