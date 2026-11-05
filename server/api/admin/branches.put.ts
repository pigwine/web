import { z } from 'zod'
import {branchSchema,validateBranchTree} from '../../../app/shared/content'
export default defineEventHandler(async event=>{
  await requireAdmin(event)
  const parsed=z.object({branches:z.array(branchSchema).min(1),revision:z.number()}).safeParse(await readBody(event))
  if(!parsed.success) throw createError({statusCode:400,statusMessage:'Invalid branches'})
  const {branches,revision}=parsed.data
  try{validateBranchTree(branches)}catch(error){throw createError({statusCode:400,statusMessage:(error as Error).message})}
  return mutateState(event,state=>{
    if(state.revision!==revision) throw createError({statusCode:409,statusMessage:'Reload before changing branches'})
    const ids=new Set(branches.map(b=>b.id))
    if(state.entries.some(e=>[e.draft,...Object.values(e.published)].some(d=>!ids.has(d.branchId)||d.relatedBranches.some(id=>!ids.has(id))))) throw createError({statusCode:409,statusMessage:'Move existing content before removing a branch'})
    state.branches=branches;return branches
  })
})
