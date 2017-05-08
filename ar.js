const Koa = require('koa');
const app = new Koa();
const path = require('path');
const view = require('./libs/template');
const router = require('koa-router')();
const convert = require('koa-convert');
app.use(convert(router.routes()));
app.use(convert(require('koa-static')('assets')));
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

app.listen(8888);
console.log('已经启动');
