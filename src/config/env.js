/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * ijyURL:爱记忆一级目录
 * HttpHost:AIP地址
 */

let baseUrl = '';
let routerMode = 'hash';
let imgBaseUrl = '';
let ijyURL = ''
let HttpHost = ''


if (process.env.NODE_ENV == 'development') {
  imgBaseUrl = '/img/';
  baseUrl = 'https://ceshi.icloudcare.com';
  ijyURL = 'ijy';
  HttpHost = 'https://ceshi.icloudcare.com/';
}else if(process.env.NODE_ENV == 'test'){
  imgBaseUrl = '/img/';
  baseUrl = 'https://ceshi.icloudcare.com';
  ijyURL = 'ijy';
  HttpHost = 'https://ceshi.icloudcare.com/';
}else if(process.env.NODE_ENV == 'production'){
  baseUrl = 'https://www.i-zhaohu.com';
  imgBaseUrl = 'https://www.izhaohu.com';
  ijyURL = 'iweb';
  HttpHost = 'https://admin.izhaohu.com/';
}

export {
  baseUrl,
  routerMode,
  imgBaseUrl,
  ijyURL,
  HttpHost,
}
