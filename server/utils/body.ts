// Only these structured editor nodes reach a public renderer. No raw HTML.
export function cleanBody(body: {type:'doc';content:unknown[]}) {
  let count=0
  const allowed=new Set(['paragraph','text','heading','bulletList','orderedList','listItem','blockquote','hardBreak','horizontalRule','image','codeBlock'])
  function visit(raw:any,depth:number):any {
    if(++count>10000 || depth>12) throw createError({statusCode:400,statusMessage:'Document is too large'})
    if(!raw || !allowed.has(raw.type)) return null
    const node:any={type:raw.type}
    if(raw.type==='text') node.text=String(raw.text||'').slice(0,50000)
    if(raw.type==='heading') node.attrs={level:Math.min(4,Math.max(2,Number(raw.attrs?.level)||2))}
    if(raw.type==='image') { if(!/^\/media\/[a-f0-9-]+$/.test(raw.attrs?.src||'')) return null; node.attrs={src:raw.attrs.src,alt:String(raw.attrs.alt||'').slice(0,300)} }
    if(raw.marks) node.marks=raw.marks.filter((m:any)=>['bold','italic','strike','code','link'].includes(m.type)).map((m:any)=>m.type==='link'?{type:'link',attrs:{href:safeHref(m.attrs?.href)}}:{type:m.type})
    if(raw.content) node.content=raw.content.map((n:any)=>visit(n,depth+1)).filter(Boolean)
    return node
  }
  return {type:'doc' as const,content:body.content.map(n=>visit(n,0)).filter(Boolean)}
}
function safeHref(href:string) { return /^(https?:\/\/|mailto:)/i.test(href||'') ? href : '#' }
export function mediaReferences(value:unknown):string[] {
  const matches=JSON.stringify(value).match(/\/media\/([a-f0-9-]+)/g)||[]
  return [...new Set(matches.map(m=>m.slice(7)))]
}
