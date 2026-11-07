<script setup lang="ts">
import { VueFlow, useVueFlow, Handle, Position } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import type {Branch,PublicItem,Locale} from '~/shared/content'
const props=defineProps<{items:PublicItem[];branches:Branch[];locale:Locale;focus?:string;editing?:boolean;showBranches?:boolean}>()
const emit=defineEmits<{select:[id:string];feature:[id:string]}>()
const {fitView,zoomIn,zoomOut}=useVueFlow()
const selected=ref(props.focus||'')
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
const nodes=computed(()=>[...branchNodes.value,...ordered.value.map(({item,x,y})=>({id:item.id,type:'work',position:{x,y},data:item}))])
const edges=computed(()=>{
 const roots=ordered.value.filter(({item})=>!item.projectId||!ordered.value.some(({item:parent})=>parent.id===item.projectId)).map(({item})=>item)
 const mainline=props.showBranches?branchNodes.value.slice(1).map((node,index)=>({id:`main-${node.id}`,source:branchNodes.value[index]!.id,sourceHandle:'main',target:node.id,type:'smoothstep',style:{stroke:'#999990'},animated:false})):roots.slice(1).map((item,index)=>({id:`main-${item.id}`,source:roots[index]!.id,target:item.id,type:'smoothstep',style:{stroke:'#999990'},animated:false}))
 const branchLinks=props.showBranches?roots.map(item=>({id:`branch-link-${item.id}`,source:`branch-${item.branchId}`,sourceHandle:'project',target:item.id,type:'smoothstep',style:{stroke:'#999990'},animated:false})):[]
 const children=ordered.value.filter(({item})=>item.projectId&&ordered.value.some(({item:parent})=>parent.id===item.projectId)).map(({item})=>({id:`child-${item.id}`,source:item.projectId!,target:item.id,type:'smoothstep',style:{stroke:'#999990'},animated:false}))
 return [...mainline,...branchLinks,...children]
})
watch(()=>[props.items,props.branches],()=>nextTick(()=>fitView({padding:.15,duration:matchMedia('(prefers-reduced-motion: reduce)').matches?0:250})))
function init(){if(props.focus) fitView({nodes:[props.focus],maxZoom:1,duration:0});else fitView({padding:.15,maxZoom:.8})}
</script>
<template><div class="life-canvas"><VueFlow :nodes="nodes" :edges="edges" :min-zoom="0.3" :max-zoom="1.4" :nodes-draggable="false" :nodes-connectable="false" :zoom-on-scroll="false" :pan-on-scroll="true" @nodes-initialized="init" @node-click="({node})=>selected=node.id">
 <template #node-branch="{data:branch}"><Handle type="target" :position="Position.Top" :connectable="false"/><div class="map-branch"><span class="map-branch-index">{{String(branches.findIndex(b=>b.id===branch.id)+1).padStart(2,'0')}}</span><span>{{branch.name[locale]}}</span></div><Handle id="main" type="source" :position="Position.Bottom" :connectable="false"/><Handle id="project" type="source" :position="Position.Right" :connectable="false"/></template>
 <template #node-work="{data:work}"><Handle type="target" :position="Position.Left" :connectable="false"/><component :is="editing?'button':resolveComponent('NuxtLink')" :to="editing?undefined:`/${locale}/projects/${work.id}`" @click="editing&&emit('select',work.id)" class="map-work" :class="{focused:selected===work.id}"><img v-if="work.cover" :src="work.cover" :alt="work.translation.title" loading="lazy"><div v-else class="map-type-cover">{{work.translation.title}}</div><div class="map-caption"><span>{{work.translation.title}}</span><time>{{work.date}}</time></div><small>{{branches.find(b=>b.id===work.branchId)?.name[locale]}}</small></component><button v-if="editing" class="node-feature" @click.stop="emit('feature',work.id)" :aria-label="work.featured?'移出导览':'加入导览'">{{work.featured?'★ 已选入导览':'☆ 加入导览'}}</button><Handle type="source" :position="Position.Right" :connectable="false"/></template>
 </VueFlow><div class="canvas-controls"><button @click="zoomOut()" :aria-label="locale==='zh'?'缩小':'Zoom out'">−</button><button @click="fitView({padding:.15,maxZoom:.8})">{{locale==='zh'?'全览':'Fit'}}</button><button @click="zoomIn()" :aria-label="locale==='zh'?'放大':'Zoom in'">＋</button></div><p class="canvas-hint">{{locale==='zh'?'拖动画布探索 · 点击作品阅读':'Drag to explore · Select a work to read'}}</p></div></template>
