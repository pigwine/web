import { createRemoteJWKSet, jwtVerify } from 'jose'
import type { H3Event } from 'h3'
const keys = new Map<string, ReturnType<typeof createRemoteJWKSet>>()
export async function requireAdmin(event:H3Event) {
  const config=useRuntimeConfig(event)
  const url=getRequestURL(event)
  const local=import.meta.dev && String(config.localAdmin)==='true' && ['127.0.0.1','localhost','[::1]'].includes(url.hostname)
  if (!['GET','HEAD','OPTIONS'].includes(event.method)) {
    const origin=getHeader(event,'origin')
    if(!origin || origin!==url.origin) throw createError({statusCode:403,statusMessage:'Invalid request origin'})
  }
  if(local) return {local:true,email:'Local preview'}
  if(!config.accessTeam || !config.accessAudience || !config.adminEmail) throw createError({statusCode:503,statusMessage:'Administrator access is not configured'})
  const token=getHeader(event,'cf-access-jwt-assertion')
  if(!token) throw createError({statusCode:401,statusMessage:'Sign in required'})
  try {
    const issuer=`https://${String(config.accessTeam).replace(/^https:\/\//,'').replace(/\/$/,'')}`
    if(!keys.has(issuer)) keys.set(issuer,createRemoteJWKSet(new URL(issuer+'/cdn-cgi/access/certs')))
    const {payload}=await jwtVerify(token,keys.get(issuer)!,{issuer,audience:String(config.accessAudience)})
    if(payload.email!==config.adminEmail) throw new Error('Not administrator')
    return {local:false,email:String(payload.email)}
  } catch { throw createError({statusCode:403,statusMessage:'Access denied'}) }
}
