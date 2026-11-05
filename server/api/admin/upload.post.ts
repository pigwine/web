export default defineEventHandler(async event=>{
  await requireAdmin(event)
  const length=Number(getHeader(event,'content-length'))
  if(!length || length>26*1024*1024) throw createError({statusCode:413,statusMessage:'File too large (maximum 25 MB)'})
  const parts=await readMultipartFormData(event);const file=parts?.find(p=>p.name==='file')
  if(!file?.filename || !file.type) throw createError({statusCode:400,statusMessage:'Choose a file'})
  const allowed=['image/jpeg','image/png','image/webp','application/pdf']
  if(!allowed.includes(file.type)) throw createError({statusCode:415,statusMessage:'Use JPEG, PNG, WebP or PDF'})
  const b=file.data; const valid=file.type==='image/jpeg'?b[0]===255&&b[1]===216:file.type==='image/png'?b.subarray(0,8).toString('hex')==='89504e470d0a1a0a':file.type==='image/webp'?b.subarray(0,4).toString()==='RIFF'&&b.subarray(8,12).toString()==='WEBP':b.subarray(0,5).toString()==='%PDF-'
  if(!valid) throw createError({statusCode:415,statusMessage:'File content does not match its type'})
  if(b.length>(file.type==='application/pdf'?25:10)*1024*1024) throw createError({statusCode:413,statusMessage:'Images: 10 MB; PDFs: 25 MB'})
  const media={id:crypto.randomUUID(),name:file.filename.slice(0,200),type:file.type,size:b.length,createdAt:new Date().toISOString()}
  await putMedia(event,media.id,b,media.type)
  await mutateState(event,state=>{state.media.push(media)})
  return {...media,url:'/media/'+media.id}
})
