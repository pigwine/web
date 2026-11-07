import type {State} from '../../app/shared/content'
import {mediaReferences} from './body'
export function isMediaPublic(state:State,id:string){return state.entries.some(e=>!e.deletedAt&&Object.values(e.published).some(p=>mediaReferences(p).includes(id)))}
