/* 零第三方依赖：node tools/build-blog.mjs */
import {readdir,readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const folder=path.join(root,'content','posts');
const names=(await readdir(folder)).filter(name=>name.endsWith('.md')).sort();
const posts=[];
for(const name of names){
  const source=(await readFile(path.join(folder,name),'utf8')).replace(/\r/g,'');
  const match=source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if(!match)throw new Error(name+' 缺少 JSON 格式的文章头信息');
  const meta=JSON.parse(match[1]);
  if(typeof meta.title!=='string'||!meta.title.trim()||typeof meta.summary!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(meta.date)||!Array.isArray(meta.tags)||!meta.tags.every(tag=>typeof tag==='string'))throw new Error(name+' 的文章字段不完整');
  posts.push({id:name.slice(0,-3),title:meta.title,date:meta.date,summary:meta.summary,tags:meta.tags,body:match[2].trim()});
}
posts.sort((a,b)=>b.date.localeCompare(a.date)||a.id.localeCompare(b.id));
const output='/* 由 tools/build-blog.mjs 从 Markdown 生成。 */\nwindow.SITE_POSTS = '+JSON.stringify(posts,null,2).replace(/</g,'\\u003c')+';\n';
await writeFile(path.join(root,'assets','posts.js'),output,'utf8');
console.log('已生成 '+posts.length+' 篇博客笔记。');
