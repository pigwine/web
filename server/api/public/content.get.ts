import {publicItems} from '../../../app/shared/content'
export default defineEventHandler(async event=>{
  const locale=getQuery(event).locale==='en'?'en':'zh';const state=await readState(event)
  setHeader(event,'Cache-Control','no-store')
  return {branches:state.branches,items:publicItems(state,locale),demo:import.meta.dev && state.entries.every(e=>!!e.deletedAt)}
})
