import { z } from 'zod'
import { draftSchema, validDate } from '../../../app/shared/content'
export default defineEventHandler(async event=>{
  await requireAdmin(event)
  const parsed=z.object({draft:draftSchema,version:z.number().int().min(0)}).safeParse(await readBody(event))
  if(!parsed.success) throw createError({statusCode:400,statusMessage:'Invalid content',data:parsed.error.flatten()})
  const {draft,version}=parsed.data
  if(!validDate(draft.date) || (draft.endDate && (!validDate(draft.endDate) || draft.endDate<draft.date))) throw createError({statusCode:400,statusMessage:'Invalid date range'})
  for(const locale of ['zh','en'] as const) draft.translations[locale].body=cleanBody(draft.translations[locale].body)
  return mutateState(event,state=>{
    const branches=new Set(state.branches.map(b=>b.id))
    if(!branches.has(draft.branchId) || draft.relatedBranches.some(id=>!branches.has(id))) throw createError({statusCode:400,statusMessage:'Branch does not exist'})
    if(draft.projectId && (draft.id===draft.projectId || !state.entries.some(e=>e.id===draft.projectId && e.draft.kind==='project' && !e.deletedAt))) throw createError({statusCode:400,statusMessage:'Invalid parent project'})
    if(draft.kind==='project' && draft.projectId) throw createError({statusCode:400,statusMessage:'Projects cannot be nested'})
    const refs=mediaReferences(draft); if(refs.some(id=>!state.media.some(m=>m.id===id))) throw createError({statusCode:400,statusMessage:'Missing attachment'})
    if(draft.cover && !/^\/media\/[a-f0-9-]+$/.test(draft.cover)) throw createError({statusCode:400,statusMessage:'Use an uploaded cover'})
    let entry=state.entries.find(e=>e.id===draft.id)
    if(entry && (entry.version!==version || entry.deletedAt)) throw createError({statusCode:409,statusMessage:'This content changed. Reload before editing.'})
    if(!entry) {if(version!==0) throw createError({statusCode:409});entry={id:draft.id,draft,published:{},version:0,updatedAt:'',history:[]};state.entries.push(entry)}
    else entry.history=[entry.draft,...entry.history].slice(0,20)
    entry.draft=draft;entry.version++;entry.updatedAt=new Date().toISOString();return entry
  })
})
