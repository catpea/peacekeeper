#!/usr/bin/env -S node

import path from 'path';
import http from 'http';
import https from 'https';
import Koa from 'koa';
import peacoat from 'peacoat';

import koaViews from 'koa-views';
import koaBody from 'koa-body';
import koaRouter from '@koa/router';

const router = koaRouter();

const render = (koaViews('views'), {map: { html: 'ejs' }});
router
  .get('/', home)
  .get('/view/:id', view)
  .get('/edit/:id', edit)
  .get('/history/:id', history)
  .post('/save', save);


app.use(koaBody());
app.use(router.routes());

async function list(ctx) {
  const id = ctx.params.id;
  await ctx.render('list', { posts: posts });
}
// async function main(){
//   // let hello;
//   // if(!(await db.has('hello'))){
//   //   hello = await db.create({ id: 'hello', email: 'user@example.com' });
//   // }else{
//   //   hello = await db.get('hello');
//   // }
//   // console.log(hello);
// }
// main();


const app = new Koa();
app.context.peacoat = peacoat;
app.keys = ['im a newer secret', 'i like turtle'];

app.use(async ctx => {
  //ctx.peacoat...
  ctx.cookies.set('name', 'tobi', { signed: true });
  ctx.body = 'Hello World';
});

http.createServer(app.callback()).listen(3000);
https.createServer(app.callback()).listen(3001);
