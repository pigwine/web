import { z } from 'zod'
export const languages = ['zh', 'en'] as const
export type Locale = typeof languages[number]
export const branchSchema = z.object({ id: z.string().regex(/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,79}$/), name: z.object({ zh: z.string().min(1).max(80), en: z.string().max(100) }), parentId: z.string().nullable().default(null), order: z.number().int() })
export type Branch = z.infer<typeof branchSchema>
const bodySchema = z.object({ type: z.literal('doc'), content: z.array(z.unknown()).default([]) })
export const translationSchema = z.object({ title: z.string().max(200), summary: z.string().max(600), body: bodySchema })
export type Translation = z.infer<typeof translationSchema>
export const draftSchema = z.object({
  id: z.string().regex(/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,79}$/), kind: z.enum(['project','progress','work']), branchId: z.string(), relatedBranches: z.array(z.string()).default([]), projectId: z.string().nullable().default(null),
  date: z.string().regex(/^\d{4}(-\d{2}(-\d{2})?)?$/), endDate: z.string().default(''), status: z.enum(['planned','ongoing','completed','paused']).default('ongoing'),
  cover: z.string().default(''), media: z.array(z.string().regex(/^\/media\/[a-f0-9-]+$/)).max(100).default([]), featured: z.boolean().default(false), order: z.number().int().default(0), achievement: z.boolean().default(false), deliverable: z.boolean().default(false),
  translations: z.object({ zh: translationSchema, en: translationSchema })
})
export type Draft = z.infer<typeof draftSchema>
export type Published = Omit<Draft, 'translations'> & { translation: Translation; publishedAt: string }
export interface Entry { id: string; draft: Draft; published: Partial<Record<Locale, Published>>; version: number; updatedAt: string; deletedAt?: string; history: Draft[] }
export interface Media { id: string; name: string; type: string; size: number; createdAt: string }
export interface State { revision: number; branches: Branch[]; entries: Entry[]; media: Media[] }
export interface PublicItem extends Published { sample?: boolean; imageMedia?: string[] }
export const emptyTranslation = (): Translation => ({ title: '', summary: '', body: { type: 'doc', content: [] } })
export const defaultBranches: Branch[] = [
  { id: 'career', name: { zh: '职业', en: 'Career' }, parentId: null, order: 0 },
  { id: 'finance', name: { zh: '财商 / 金融', en: 'Finance' }, parentId: null, order: 1 },
  { id: 'media', name: { zh: '自媒体', en: 'Expression' }, parentId: null, order: 2 },
  { id: 'health', name: { zh: '健身 / 健康', en: 'Wellbeing' }, parentId: null, order: 3 },
  { id: 'learning', name: { zh: '人生技能', en: 'Learning' }, parentId: null, order: 4 }
]
export function validDate(value: string) {
  if (!/^\d{4}(-\d{2}(-\d{2})?)?$/.test(value)) return false
  const [y,m=1,d=1] = value.split('-').map(Number)
  const date = new Date(Date.UTC(y!,m!-1,d))
  return date.getUTCFullYear()===y && date.getUTCMonth()===m!-1 && date.getUTCDate()===d
}
export function validateBranchTree(branches: Branch[]) {
  if (new Set(branches.map(b=>b.id)).size !== branches.length) throw new Error('分支 ID 重复')
  const map = new Map(branches.map(b=>[b.id,b]))
  for (const branch of branches) { const seen = new Set([branch.id]); let parent = branch.parentId
    while (parent) { if (seen.has(parent)) throw new Error('分支不能循环关联'); seen.add(parent); const node=map.get(parent); if(!node) throw new Error('父分支不存在'); parent=node.parentId }
  }
}
export function publicItems(state: State, locale: Locale): PublicItem[] {
  const imageIds=new Set(state.media.filter(media=>media.type.startsWith('image/')).map(media=>media.id))
  return state.entries.filter(e=>!e.deletedAt && e.published[locale]).map(e=>{
    const published=e.published[locale]!
    return {...published,imageMedia:published.media.filter(url=>imageIds.has(url.slice('/media/'.length)))}
  }).sort((a,b)=>a.order-b.order)
}
