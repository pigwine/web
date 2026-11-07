<script setup lang="ts">
import { VueFlow, useVueFlow, Handle, Position } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import type {Branch,PublicItem,Locale} from '~/shared/content'
const props=defineProps<{items:PublicItem[];branches:Branch[];locale:Locale;focus?:string;editing?:boolean;showBranches?:boolean}>()
const emit=defineEmits<{select:[id:string];feature:[id:string]}>()
const {fitView,zoomIn,zoomOut}=useVueFlow()
const selected=ref(props.focus||'')
const photoIndex=reactive<Record<string,number>>({})
const photos=(item:PublicItem)=>[...new Set([item.cover,...(item.imageMedia||[])].filter(Boolean))]
const currentPhoto=(item:PublicItem)=>photos(item)[photoIndex[item.id]||0]
function stepPhoto(item:PublicItem,step:number){const count=photos(item).length;if(count>1)photoIndex[item.id]=((photoIndex[item.id]||0)+step+count)%count}
function focusCard(id:string){selected.value=id;if(props.editing&&!id.startsWith('branch-'))emit('select',id)}
function pointerHighlight(event:PointerEvent){const target=event.currentTarget as HTMLElement;const rect=target.getBoundingClientRect();target.style.setProperty('--pointer-x',`${((event.clientX-rect.left)/rect.width)*100}%`);target.style.setProperty('--pointer-y',`${((event.clientY-rect.top)/rect.height)*100}%`)}
const statusLabel=(status:PublicItem['status'])=>({planned:props.locale==='zh'?'筹备中':'Planned',ongoing:props.locale==='zh'?'进行中':'In progress',completed:props.locale==='zh'?'已完成':'Completed',paused:props.locale==='zh'?'暂时搁置':'Paused'})[status]
const kindLabel=(kind:PublicItem['kind'])=>({project:props.locale==='zh'?'项目':'Project',progress:props.locale==='zh'?'进展':'Progress',work:props.locale==='zh'?'作品':'Work'})[kind]
const lineStyle=(status:PublicItem['status'])=>({stroke:status==='ongoing'?'#3f3f3b':status==='completed'?'#666660':'#96968e',strokeWidth:status==='ongoing'?2.5:1.6,strokeDasharray:status==='planned'?'7 6':status==='paused'?'2 6':undefined})
const ordered=computed(()=>{
 const items=props.items.slice(0,150)
 const ids=new Set(items.map(item=>item.id))
 const roots=items.filter(item=>!item.projectId||!ids.has(item.projectId)).sort((a,b)=>a.date.localeCompare(b.date)||a.order-b.order)
 if(props.showBranches){
  let y=60
  const positions: {item:PublicItem;x:number;y:number}[]=[]
  for(const branch of [...props.branches].sort((a,b)=>a.order-b.order)){
   const branchRoots=roots.filter(item=>item.branchId===branch.id)
   let branchHeight=0
   for(const root of branchRoots){
    const children=items.filter(item=>item.projectId===root.id).sort((a,b)=>a.date.localeCompare(b.date)||a.order-b.order)
    positions.push({item:root,x:410,y:y+branchHeight})
    children.forEach((item,index)=>positions.push({item,x:760,y:y+branchHeight+index*290}))
    branchHeight+=Math.max(300,children.length*290+50)
   }
   y+=Math.max(150,branchHeight+30)
  }
  return positions
 }
 let y=60
 return roots.flatMap(root=>{
  const children=items.filter(item=>item.projectId===root.id).sort((a,b)=>a.date.localeCompare(b.date)||a.order-b.order)
  const group=[{item:root,x:70,y},...children.map((item,index)=>({item,x:420,y:y+index*320}))]
  y+=Math.max(390,children.length*320+80)
  return group
 })
})
const branchNodes=computed(()=>{
 if(!props.showBranches)return []
 let y=60
 return [...props.branches].sort((a,b)=>a.order-b.order).map(branch=>{
  const node={id:`branch-${branch.id}`,type:'branch',position:{x:60,y},data:branch}
  const roots=ordered.value.filter(({item})=>item.branchId===branch.id&&!item.projectId)
  const height=roots.reduce((sum,{item})=>sum+Math.max(300,ordered.value.filter(({item:child})=>child.projectId===item.id).length*290+50),0)
  y+=Math.max(150,height+30)
  return node
 })
})
const mobileGroups=computed(()=>[...props.branches].sort((a,b)=>a.order-b.order).map(branch=>({
 branch,
 roots:props.items.filter(item=>item.branchId===branch.id&&(!item.projectId||!props.items.some(parent=>parent.id===item.projectId))).sort((a,b)=>a.date.localeCompare(b.date)||a.order-b.order).map(root=>({root,children:props.items.filter(item=>item.projectId===root.id).sort((a,b)=>a.date.localeCompare(b.date)||a.order-b.order)}))
})))
const canvasHeight=computed(()=>props.showBranches?Math.max(700,Math.min(2400,(branchNodes.value.at(-1)?.position.y||60)+230)):undefined)
const nodes=computed(()=>[...branchNodes.value,...ordered.value.map(({item,x,y})=>({id:item.id,type:'work',position:{x,y},data:item}))])
const edges=computed(()=>{
 const roots=ordered.value.filter(({item})=>!item.projectId||!ordered.value.some(({item:parent})=>parent.id===item.projectId)).map(({item})=>item)
 const mainline=props.showBranches?branchNodes.value.slice(1).map((node,index)=>({id:`main-${node.id}`,source:branchNodes.value[index]!.id,sourceHandle:'main',target:node.id,type:'smoothstep',class:'canvas-edge canvas-edge--main',style:{stroke:'#b4b4ad',strokeWidth:1.5},animated:false})):roots.slice(1).map((item,index)=>({id:`main-${item.id}`,source:roots[index]!.id,target:item.id,type:'smoothstep',class:`canvas-edge canvas-edge--${item.status}`,style:lineStyle(item.status),animated:false}))
 const branchLinks=props.showBranches?roots.map(item=>({id:`branch-link-${item.id}`,source:`branch-${item.branchId}`,sourceHandle:'project',target:item.id,type:'smoothstep',class:`canvas-edge canvas-edge--${item.status}`,style:lineStyle(item.status),animated:false})):[]
 const children=ordered.value.filter(({item})=>item.projectId&&ordered.value.some(({item:parent})=>parent.id===item.projectId)).map(({item})=>({id:`child-${item.id}`,source:item.projectId!,target:item.id,type:'smoothstep',class:`canvas-edge canvas-edge--${item.status}`,style:lineStyle(item.status),animated:false}))
 return [...mainline,...branchLinks,...children]
})
watch(()=>[props.items,props.branches],()=>nextTick(()=>fitView({padding:.15,duration:matchMedia('(prefers-reduced-motion: reduce)').matches?0:250})))
function init(){if(props.focus) fitView({nodes:[props.focus],maxZoom:1,duration:0});else fitView({padding:.1,maxZoom:1})}
</script>
<template><div class="life-canvas" :style="canvasHeight ? {height:`${canvasHeight}px`} : undefined"><VueFlow :nodes="nodes" :edges="edges" :min-zoom="0.3" :max-zoom="1.4" :nodes-draggable="false" :nodes-connectable="false" :zoom-on-scroll="false" :pan-on-scroll="true" @nodes-initialized="init" @node-click="({node})=>selected=node.id">
 <template #node-branch="{data:branch}"><Handle type="target" :position="Position.Top" :connectable="false"/><button type="button" class="map-branch" :class="{focused:selected===`branch-${branch.id}`}" @click.stop="focusCard(`branch-${branch.id}`)" @pointermove="pointerHighlight"><span class="map-branch-index">{{String(branches.findIndex(b=>b.id===branch.id)+1).padStart(2,'0')}}</span><span>{{branch.name[locale]}}</span></button><Handle id="main" type="source" :position="Position.Bottom" :connectable="false"/><Handle id="project" type="source" :position="Position.Right" :connectable="false"/></template>
 <template #node-work="{data:work}"><Handle type="target" :position="Position.Left" :connectable="false"/><div class="map-work" :class="[`map-work--${work.kind}`,`map-work--${work.status}`,{focused:selected===work.id}]" tabindex="0" role="group" :aria-label="`${work.translation.title}，${statusLabel(work.status)}`" @click="focusCard(work.id)" @keydown.enter="focusCard(work.id)" @pointermove="pointerHighlight"><div class="map-work-meta"><span>{{kindLabel(work.kind)}}</span><time>{{work.date}}</time></div><div v-if="currentPhoto(work)" class="map-photo-frame"><img :key="currentPhoto(work)" :src="currentPhoto(work)" :alt="work.translation.title" loading="lazy"><div v-if="photos(work).length>1" class="map-photo-controls"><button type="button" :aria-label="locale==='zh'?'上一张图片':'Previous image'" @click.stop="stepPhoto(work,-1)">←</button><span>{{(photoIndex[work.id]||0)+1}} / {{photos(work).length}}</span><button type="button" :aria-label="locale==='zh'?'下一张图片':'Next image'" @click.stop="stepPhoto(work,1)">→</button></div></div><div v-else class="map-type-cover">{{work.translation.title}}</div><div v-if="currentPhoto(work)" class="map-caption"><span>{{work.translation.title}}</span></div><span class="map-status" :class="`map-status--${work.status}`">{{statusLabel(work.status)}}</span><NuxtLink v-if="!editing" :to="`/${locale}/projects/${work.id}`" class="map-read-link" @click.stop>{{locale==='zh'?'阅读':'Read'}} ↗</NuxtLink></div><button v-if="editing" class="node-feature" @click.stop="emit('feature',work.id)" :aria-label="work.featured?'移出导览':'加入导览'">{{work.featured?'★ 已选入导览':'☆ 加入导览'}}</button><Handle type="source" :position="Position.Right" :connectable="false"/></template>
 </VueFlow>
 <div v-if="showBranches" class="mobile-flow-list">
  <section v-for="(group,index) in mobileGroups" :key="group.branch.id" class="mobile-flow-branch">
   <div class="map-branch"><span class="map-branch-index">{{String(index+1).padStart(2,'0')}}</span><span>{{group.branch.name[locale]}}</span></div>
   <div v-for="record in group.roots" :key="record.root.id" class="mobile-flow-project">
    <div v-for="item in [record.root,...record.children]" :key="item.id" class="mobile-flow-card" :class="[`mobile-flow-card--${item.status}`,{'mobile-flow-child':item.id!==record.root.id}]">
     <NuxtLink :to="`/${locale}/projects/${item.id}`" class="mobile-flow-read">
      <span class="mobile-flow-meta">{{kindLabel(item.kind)}} <time>{{item.date}}</time></span>
      <strong>{{item.translation.title}}</strong>
     </NuxtLink>
     <div v-if="currentPhoto(item)" class="mobile-flow-photo"><img :src="currentPhoto(item)" :alt="item.translation.title" loading="lazy"><div v-if="photos(item).length>1" class="mobile-flow-photo-controls"><button type="button" :aria-label="locale==='zh'?'上一张图片':'Previous image'" @click="stepPhoto(item,-1)">←</button><span>{{(photoIndex[item.id]||0)+1}} / {{photos(item).length}}</span><button type="button" :aria-label="locale==='zh'?'下一张图片':'Next image'" @click="stepPhoto(item,1)">→</button></div></div>
     <span class="map-status" :class="`map-status--${item.status}`">{{statusLabel(item.status)}}</span>
    </div>
   </div>
  </section>
 </div>
 <div class="canvas-controls"><button @click="zoomOut()" :aria-label="locale==='zh'?'缩小':'Zoom out'">−</button><button @click="fitView({padding:.1,maxZoom:1})">{{locale==='zh'?'全览':'Fit'}}</button><button @click="zoomIn()" :aria-label="locale==='zh'?'放大':'Zoom in'">＋</button></div><div v-if="showBranches" class="canvas-legend" :aria-label="locale==='zh'?'项目状态图例':'Project status legend'"><span class="map-status map-status--planned">{{statusLabel('planned')}}</span><span class="map-status map-status--ongoing">{{statusLabel('ongoing')}}</span><span class="map-status map-status--completed">{{statusLabel('completed')}}</span><span class="map-status map-status--paused">{{statusLabel('paused')}}</span></div><p class="canvas-hint">{{locale==='zh'?'拖动画布探索 · 点击作品阅读':'Drag to explore · Select a work to read'}}</p></div></template>
