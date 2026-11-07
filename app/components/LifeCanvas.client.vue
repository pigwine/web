<script setup lang="ts">
import { VueFlow, useVueFlow, Handle, Position } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import type {Branch,PublicItem,Locale} from '~/shared/content'
const props=defineProps<{items:PublicItem[];branches:Branch[];locale:Locale;focus?:string;editing?:boolean}>()
const emit=defineEmits<{select:[id:string];feature:[id:string]}>()
const {fitView,zoomIn,zoomOut}=useVueFlow()
const selected=ref(props.focus||'')
const ordered=computed(()=>{
 const items=props.items.slice(0,150)
 const ids=new Set(items.map(item=>item.id))
 const roots=items.filter(item=>!item.projectId||!ids.has(item.projectId)).sort((a,b)=>a.date.localeCompare(b.date)||a.order-b.order)
 let y=60
 return roots.flatMap(root=>{
  const children=items.filter(item=>item.projectId===root.id).sort((a,b)=>a.date.localeCompare(b.date)||a.order-b.order)
  const group=[{item:root,x:70,y},...children.map((item,index)=>({item,x:420,y:y+index*320}))]
  y+=Math.max(390,children.length*320+80)
  return group
 })
})
const nodes=computed(()=>ordered.value.map(({item,x,y})=>({id:item.id,type:'work',position:{x,y},data:item})))
const edges=computed(()=>{
 const roots=ordered.value.filter(({item})=>!item.projectId||!ordered.value.some(({item:parent})=>parent.id===item.projectId)).map(({item})=>item)
 const mainline=roots.slice(1).map((item,index)=>({id:`main-${item.id}`,source:roots[index]!.id,target:item.id,type:'smoothstep',style:{stroke:'#999990'},animated:false}))
 const children=ordered.value.filter(({item})=>item.projectId&&ordered.value.some(({item:parent})=>parent.id===item.projectId)).map(({item})=>({id:`child-${item.id}`,source:item.projectId!,target:item.id,type:'smoothstep',style:{stroke:'#999990'},animated:false}))
 return [...mainline,...children]
})
watch(()=>props.items,()=>nextTick(()=>fitView({padding:.15,duration:matchMedia('(prefers-reduced-motion: reduce)').matches?0:250})))
function init(){if(props.focus) fitView({nodes:[props.focus],maxZoom:1,duration:0});else fitView({padding:.15,maxZoom:.8})}
</script>
<template><div class="life-canvas"><VueFlow :nodes="nodes" :edges="edges" :min-zoom="0.3" :max-zoom="1.4" :nodes-draggable="false" :nodes-connectable="false" :zoom-on-scroll="false" :pan-on-scroll="true" @nodes-initialized="init" @node-click="({node})=>selected=node.id">
 <template #node-work="{data:work}"><Handle type="target" :position="Position.Left" :connectable="false"/><component :is="editing?'button':resolveComponent('NuxtLink')" :to="editing?undefined:`/${locale}/projects/${work.id}`" @click="editing&&emit('select',work.id)" class="map-work" :class="{focused:selected===work.id}"><img v-if="work.cover" :src="work.cover" :alt="work.translation.title" loading="lazy"><div v-else class="map-type-cover">{{work.translation.title}}</div><div class="map-caption"><span>{{work.translation.title}}</span><time>{{work.date}}</time></div><small>{{branches.find(b=>b.id===work.branchId)?.name[locale]}}</small></component><button v-if="editing" class="node-feature" @click.stop="emit('feature',work.id)" :aria-label="work.featured?'移出导览':'加入导览'">{{work.featured?'★ 已选入导览':'☆ 加入导览'}}</button><Handle type="source" :position="Position.Right" :connectable="false"/></template>
 </VueFlow><div class="canvas-controls"><button @click="zoomOut()" :aria-label="locale==='zh'?'缩小':'Zoom out'">−</button><button @click="fitView({padding:.15,maxZoom:.8})">{{locale==='zh'?'全览':'Fit'}}</button><button @click="zoomIn()" :aria-label="locale==='zh'?'放大':'Zoom in'">＋</button></div><p class="canvas-hint">{{locale==='zh'?'拖动画布探索 · 点击作品阅读':'Drag to explore · Select a work to read'}}</p></div></template>
