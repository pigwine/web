export default defineEventHandler(async event=>{
  const id=getRouterParam(event,'id')!;const state=await readState(event);const media=state.media.find(m=>m.id===id)
  if(!media) throw createError({statusCode:404})
  const visible=isMediaPublic(state,id)
  if(!visible) await requireAdmin(event)
  const bytes=await getMedia(event,id);if(!bytes) throw createError({statusCode:404})
  setHeaders(event,{'Content-Type':media.type,'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff','Content-Disposition':media.type==='application/pdf'?`attachment; filename="${encodeURIComponent(media.name)}"`:'inline','Content-Security-Policy':"default-src 'none'; sandbox"})
  return new Uint8Array(bytes)
})
