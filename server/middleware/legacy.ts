export default defineEventHandler(event=>{
 const path=getRequestURL(event).pathname
 const match=path.match(/^\/(?:(zh|en)\/)?(usefultool|investment|widgets|about|contact|privacy|terms)$/)
 if(!match)return
 const locale=match[1]||'en';const targets:Record<string,string>={usefultool:'archive/tools',investment:'archive/investment',widgets:'archive/widgets',about:'about',contact:'about',privacy:'privacy',terms:'terms'}
 const destination=`/${locale}/${targets[match[2]!]}`
 if(destination!==path)return sendRedirect(event,destination,301)
})
