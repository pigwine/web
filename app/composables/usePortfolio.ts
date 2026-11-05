import { demoItems } from '~/shared/demo'
import type {Locale} from '~/shared/content'
export function usePortfolio(){
  const route=useRoute()
  const locale=computed<Locale>(()=>route.params.locale==='en'?'en':'zh')
  const base=computed(()=>'/'+locale.value)
  const {data,error,refresh}=useFetch('/api/public/content',{query:{locale},key:()=>`portfolio-${locale.value}`})
  const items=computed(()=>data.value?.demo?demoItems(locale.value):data.value?.items||[])
  const branches=computed(()=>data.value?.branches||[])
  const t=(zh:string,en:string)=>locale.value==='zh'?zh:en
  return {locale,base,data,error,refresh,items,branches,t}
}
