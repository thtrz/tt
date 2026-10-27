/* 把站点资源放入 Pages 发布目录；仅由可选 Actions 工作流调用。 */
import {mkdir,copyFile,rm} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'.site-dist');
await rm(dist,{recursive:true,force:true});
for(const name of ['index.html','project-docs.html','assets/style.css','assets/app.js','assets/posts.js','assets/favicon.svg','assets/documents.css','assets/documents.js']){
  const target=path.join(dist,name);
  await mkdir(path.dirname(target),{recursive:true});
  await copyFile(path.join(root,name),target);
}
console.log('站点资源已整理到 .site-dist');
