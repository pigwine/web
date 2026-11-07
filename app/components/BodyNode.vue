<script setup lang="ts">
const props=defineProps<{node:any}>()
const tag=computed(()=>({paragraph:'p',heading:'h'+Math.min(4,Math.max(2,props.node.attrs?.level||2)),bulletList:'ul',orderedList:'ol',listItem:'li',blockquote:'blockquote',codeBlock:'pre'} as Record<string,string>)[props.node.type]||'div')
const href=computed(()=>{const value=props.node.marks?.find((m:any)=>m.type==='link')?.attrs?.href;return /^(https?:\/\/|mailto:)/.test(value||'')?value:undefined})
</script>
<template>
  <component v-if="node.type==='text'" :is="href?'a':'span'" :href="href" :rel="href?'noopener noreferrer':undefined" :class="{bold:node.marks?.some((m:any)=>m.type==='bold'),italic:node.marks?.some((m:any)=>m.type==='italic'),strike:node.marks?.some((m:any)=>m.type==='strike')}">{{node.text}}</component>
  <br v-else-if="node.type==='hardBreak'">
  <hr v-else-if="node.type==='horizontalRule'">
  <img v-else-if="node.type==='image'" :src="node.attrs.src" :alt="node.attrs.alt||''" loading="lazy">
  <component v-else :is="tag"><BodyNode v-for="(child,i) in node.content||[]" :key="i" :node="child" /></component>
</template>
