# AngularAntuiAppDemo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


#生成组件命令
```
ng g ng-zorro-antd:[template] --name=NAME [options]
```
#例如通过以下代码可以快速生成一个登陆框组件
```ng g ng-zorro-antd:form-normal-login -p app --styleext=less --name=login --path=src/app/views
#生成组件参数

`--name`

组件名称(必选)

`--styleext`

样式文件扩展名（默认 css）

`--prefix, -p`

组件选择器前缀

`--inlineStyle, -s`

使用行内样式

`--inlineTemplate, -t`

使用行内模版

`--path`

指定组件创建目录（相当于执行时所在的目录）

`--spec`

是否生成 .spec 测试文件

`--skipImport`

是否跳过模块引入（及导入所属模块）

`--selector`

选择器名称（默认根据 name 自动生成）

`--export`

是否将组件声明在模块的 exports

`--module, -m`

指定要声明的模块名
