#!/usr/bin/env -S node

import { configuration } from './configuration.js';

import path from 'path';
import http from 'http';
import https from 'https';
import Koa from 'koa';

import peacoat from 'peacoat';

import KoaViews from 'koa-views';
import koaBody from 'koa-body';
import KoaRouter from '@koa/router';
import koaStatic from 'koa-static';

const koaRouter = KoaRouter();
const koaViews = KoaViews('views', {map: { html: 'ejs' }});

koaRouter
  .get('/', home)
  .get('/view/:id', view)
  .get('/edit/:id', edit)
  .get('/history/:id', history)
  .post('/save', save);

const app = new Koa();
app.context.peacoat = peacoat;
app.keys = ['im a newer secret', 'i like turtle'];


app.use(koaBody());
app.use(koaViews);
app.use(koaRouter.routes());
app.use(koaStatic('static'));

const posts = [];

async function home(ctx) {
  ctx.redirect('/view/main');
}

async function view(ctx) {
  const id = ctx.params.id;

  let exists = await ctx.peacoat.has(id);
  if((id === 'main') && (!exists)){
    await ctx.peacoat.create({ id: 'main', content: 'Hello World' });
    exists = true;
  }

  let content = `This page does not yet exist.`;
  if(exists) content = (await ctx.peacoat.get(id)).content;
  await ctx.render('view', Object.assign({id, content},configuration,{}));
}

async function edit(ctx) {
  const id = ctx.params.id;
  let exists = await ctx.peacoat.has(id);
  let content = `This page does not yet exist.`;
  if(exists) content = (await ctx.peacoat.get(id)).content;
  await ctx.render('edit', Object.assign({id, content},configuration,{}));
}

async function history(ctx) {
  const id = ctx.params.id;
  await ctx.render('history', Object.assign({},configuration,{}));
}

async function save(ctx) {
  const id = ctx.params.id;
  await ctx.render('save', Object.assign({},configuration,{}));
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



// app.use(async ctx => {
//   //ctx.peacoat...
//   ctx.cookies.set('name', 'tobi', { signed: true });
//   ctx.body = 'Hello World';
// });

http.createServer(app.callback()).listen(3000);
https.createServer(app.callback()).listen(3001);
