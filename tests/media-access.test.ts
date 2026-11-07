import {describe,it,expect} from 'vitest'
import {isMediaPublic} from '../server/utils/media-access'
import {defaultBranches,emptyTranslation,type State,type Draft} from '../app/shared/content'
const media='/media/1234-5678'
const draft:Draft={id:'p',kind:'project',branchId:'career',relatedBranches:[],projectId:null,date:'2024',endDate:'',status:'ongoing',cover:media,media:[media],featured:false,order:0,achievement:false,deliverable:false,translations:{zh:emptyTranslation(),en:emptyTranslation()}}
const {translations,...rest}=draft
const state:State={revision:0,branches:defaultBranches,media:[{id:'1234-5678',name:'test.png',type:'image/png',size:1,createdAt:''}],entries:[{id:'p',draft,published:{},history:[],version:1,updatedAt:''}]}
describe('attachment visibility',()=>{it('follows published snapshots, not drafts',()=>{expect(isMediaPublic(state,'1234-5678')).toBe(false);state.entries[0]!.published.zh={...rest,translation:emptyTranslation(),publishedAt:''};expect(isMediaPublic(state,'1234-5678')).toBe(true);delete state.entries[0]!.published.zh;expect(isMediaPublic(state,'1234-5678')).toBe(false)})})
