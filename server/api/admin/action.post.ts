import { z } from 'zod'
export default defineEventHandler(async event=>{
  await requireAdmin(event)
  const parsed=z.object({id:z.string(),version:z.number(),action:z.enum(['publish','unpublish','delete','restore']),locale:z.enum(['zh','en']).default('zh')}).safeParse(await readBody(event))
  if(!parsed.success) throw createError({statusCode:400,statusMessage:'Invalid action'})
  const {id,version,action,locale}=parsed.data
  return mutateState(event,state=>{
    const entry=state.entries.find(e=>e.id===id)
    if(!entry) throw createError({statusCode:404})
    if(entry.version!==version) throw createError({statusCode:409,statusMessage:'Content changed. Reload and retry.'})
    if(action==='publish') {
      if(entry.deletedAt || !entry.draft.translations[locale].title.trim()) throw createError({statusCode:400,statusMessage:'A title is required before publishing'})
      const {translations,...rest}=entry.draft
      entry.published[locale]={...structuredClone(rest),translation:structuredClone(translations[locale]),publishedAt:new Date().toISOString()}
    } else if(action==='unpublish') delete entry.published[locale]
    else if(action==='delete') {
      if(state.entries.some(e=>!e.deletedAt && (e.draft.projectId===id || Object.values(e.published).some(p=>p.projectId===id)))) throw createError({statusCode:409,statusMessage:'Move linked progress or works before deleting the project'})
      entry.deletedAt=new Date().toISOString();entry.published={}
    } else delete entry.deletedAt
    entry.version++;entry.updatedAt=new Date().toISOString();return entry
  })
})
