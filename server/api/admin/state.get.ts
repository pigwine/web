export default defineEventHandler(async event=>{const user=await requireAdmin(event);setHeader(event,'Cache-Control','no-store'); return {...await readState(event),user}})
