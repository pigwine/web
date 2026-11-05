export default defineEventHandler(event=>{
 setHeader(event,'X-Content-Type-Options','nosniff')
 setHeader(event,'Referrer-Policy','strict-origin-when-cross-origin')
 const path=getRequestURL(event).pathname
 if(path.startsWith('/api/admin/')&&path!=='/api/admin/upload'&&Number(getHeader(event,'content-length')||0)>2*1024*1024) throw createError({statusCode:413,statusMessage:'Content exceeds 2 MB'})
 if(path.startsWith('/admin')||path.startsWith('/api/admin')) setHeaders(event,{'Cache-Control':'no-store','X-Robots-Tag':'noindex, nofollow'})
})
