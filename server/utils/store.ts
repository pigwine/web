import { defaultBranches, type State } from '../../app/shared/content'
import type { H3Event } from 'h3'
interface SQLBinding { prepare(query:string): { bind(...args:unknown[]): { first<T>():Promise<T|null>; run():Promise<{meta:{changes:number}}> }; first<T>():Promise<T|null> } }
interface Bucket { put(key:string,value:ArrayBuffer|Uint8Array,options?:unknown):Promise<unknown>; get(key:string):Promise<{arrayBuffer():Promise<ArrayBuffer>}|null> }
export function bindings(event:H3Event): {DB?:SQLBinding; MEDIA?:Bucket} { return event.context.cloudflare?.env || {} }
const initial = (): State => ({ revision: 0, branches: structuredClone(defaultBranches), entries: [], media: [] })
function usesFileStorage(event:H3Event) { return import.meta.dev || String(useRuntimeConfig(event).vpsStorage)==='true' }
export async function readState(event:H3Event):Promise<State> {
  const db=bindings(event).DB
  if(db) { const row=await db.prepare('SELECT body FROM content_state WHERE id = 1').first<{body:string}>(); return row ? JSON.parse(row.body):initial() }
  if(!usesFileStorage(event)) throw createError({statusCode:503,statusMessage:'Storage is not configured'})
  return await useStorage('data').getItem<State>('state') || initial()
}
let queue:Promise<unknown> = Promise.resolve()
export async function mutateState<T>(event:H3Event, fn:(state:State)=>T):Promise<T> {
  const work=async()=>{ const state=await readState(event); const revision=state.revision; const result=fn(state); state.revision++
    const db=bindings(event).DB
    if(db) { const saved=await db.prepare('UPDATE content_state SET body = ?, revision = ? WHERE id = 1 AND revision = ?').bind(JSON.stringify(state),state.revision,revision).run(); if(!saved.meta.changes) throw createError({statusCode:409,statusMessage:'Content changed. Reload and retry.'}) }
    else await useStorage('data').setItem('state',state)
    return result
  }
  const result=queue.then(work,work); queue=result.catch(()=>{}); return result
}
export async function putMedia(event:H3Event,id:string,bytes:Uint8Array,type:string) {
  const bucket=bindings(event).MEDIA
  if(bucket) await bucket.put(id,bytes,{httpMetadata:{contentType:type}})
  else if(usesFileStorage(event)) await useStorage('data').setItem('media:'+id,Buffer.from(bytes).toString('base64'))
  else throw createError({statusCode:503,statusMessage:'Media storage is not configured'})
}
export async function getMedia(event:H3Event,id:string) {
  const bucket=bindings(event).MEDIA
  if(bucket) return (await bucket.get(id))?.arrayBuffer()
  if(!usesFileStorage(event)) throw createError({statusCode:503})
  const bytes=await useStorage('data').getItem<string>('media:'+id); return bytes ? Uint8Array.from(Buffer.from(bytes,'base64')):null
}
