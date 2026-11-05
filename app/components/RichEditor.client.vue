<script setup lang="ts">
import {useEditor,EditorContent} from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
const props=defineProps<{modelValue:any}>();const emit=defineEmits(['update:modelValue'])
const editor=useEditor({extensions:[StarterKit.configure({heading:{levels:[2,3,4]},link:{openOnClick:false}}),Image],content:props.modelValue,onUpdate:({editor})=>emit('update:modelValue',editor.getJSON()),editorProps:{attributes:{'aria-label':'正文编辑器',class:'rich-body'}}})
watch(()=>props.modelValue,value=>{if(editor.value&&JSON.stringify(editor.value.getJSON())!==JSON.stringify(value))editor.value.commands.setContent(value,{emitUpdate:false})},{deep:true})
onBeforeUnmount(()=>editor.value?.destroy())
</script>
<template><div class="rich-editor"><div v-if="editor" class="editor-toolbar"><button type="button" @click="editor.chain().focus().toggleBold().run()" :aria-pressed="editor.isActive('bold')"><b>B</b></button><button type="button" @click="editor.chain().focus().toggleItalic().run()" :aria-pressed="editor.isActive('italic')"><i>I</i></button><button type="button" @click="editor.chain().focus().toggleHeading({level:2}).run()">标题</button><button type="button" @click="editor.chain().focus().toggleBulletList().run()">列表</button><button type="button" @click="editor.chain().focus().toggleBlockquote().run()">引用</button><button type="button" @click="editor.chain().focus().undo().run()">撤销</button></div><EditorContent :editor="editor" /></div></template>
