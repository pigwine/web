import {publicItems} from '../../app/shared/content'
export default defineEventHandler(async event=>{
 const state=await readState(event);const base=String(useRuntimeConfig(event).public.siteUrl).replace(/\/$/,'')
 const escape=(s:string)=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')
 const urls=['zh','en'].flatMap(locale=>[`/${locale}`,`/${locale}/work`,`/${locale}/about`,...publicItems(state,locale as 'zh'|'en').map(p=>`/${locale}/projects/${encodeURIComponent(p.id)}`)])
 setHeader(event,'Content-Type','application/xml');setHeader(event,'Cache-Control','no-store')
 return '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+urls.map(url=>'<url><loc>'+escape(base+url)+'</loc></url>').join('')+'</urlset>'
})
