const Koa = require('koa');
const app = new Koa();
const path = require('path');
const view = require('./libs/template');
const router = require('koa-router')();
const convert = require('koa-convert');
const fs = require('fs');
const enforceHttps = require('koa-sslify');
const https = require('https');
const http = require('http');
app.use(convert(router.routes()));
app.use(convert(require('koa-static')('assets')));
app.use(enforceHttps());

var options = {
    key: fs.readFileSync('./key.pem'),  //ssl文件路径
    cert: fs.readFileSync('./key.cert.pem')  //ssl文件路径
};


view(app, {
    root: path.join(__dirname, './template'),
    pagedir: 'page',
    viewExt: 'html',
    layout: 'layout',
    cache: false,
    debug: true,
    useLess: true
    }
);



router.get('/', function *(){
	console.log('VRdemo');
    yield this.render('home',{}); 
 });

router.get('/ar', function *(){
	console.log('ar');
    yield this.render('ar',{}); 
 });

router.get('/t', function *(){
	console.log('ar');
    yield this.render('text',{}); 
 });

//app.listen(8888);

http.createServer(app.callback()).listen(8888);

https.createServer(options, app.callback()).listen(80);
console.log('已经启动');
