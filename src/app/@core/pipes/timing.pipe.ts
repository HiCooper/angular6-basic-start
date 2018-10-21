import {Pipe, PipeTransform} from '@angular/core';


@Pipe({name: 'timing', pure: true})
export class TimingPipe implements PipeTransform {

    private static initZero(time: number): string {
        return time < 10 ? '0' : '';
    }

    /**
     *
     * 将分钟转化为 小时：分钟显示
     *  如 59  显示为 00:59 ,
     *  如 70 显示为 01:10
     *
     * @param time 分钟值
     */
    transform(time: number): string {
        if (time) {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${TimingPipe.initZero(minutes)}${minutes}:${TimingPipe.initZero(seconds)}${seconds}`;
        }

        return '00:00';
    }

}
