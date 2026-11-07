import { z } from 'zod'
import { adminSessionMaxAge, createAdminSession } from '../utils/admin-session'
import { verifyBasicCredential } from '../utils/basic-auth'

const attempts = new Map<string, { count: number; until: number }>()

export default defineEventHandler(async event => {
  const url = getRequestURL(event)
  if (getHeader(event, 'origin') !== url.origin) throw createError({ statusCode: 403, statusMessage: 'Invalid request origin' })
  const config = useRuntimeConfig(event)
  if (!config.vpsAdminUser || !config.vpsAdminHash) throw createError({ statusCode: 503, statusMessage: 'Password sign-in is unavailable' })
  const key = getHeader(event, 'cf-connecting-ip') || getRequestIP(event) || 'unknown'
  const now = Date.now()
  const current = attempts.get(key)
  if (current && current.until > now && current.count >= 6) throw createError({ statusCode: 429, statusMessage: 'Too many attempts. Try again in 15 minutes.' })
  const parsed = z.object({ password: z.string().min(1).max(256) }).safeParse(await readBody(event))
  if (!parsed.success) throw createError({ statusCode: 400, statusMessage: 'Enter a password' })
  const header = 'Basic ' + Buffer.from(`${config.vpsAdminUser}:${parsed.data.password}`).toString('base64')
  const valid = await verifyBasicCredential(header, String(config.vpsAdminUser), String(config.vpsAdminHash))
  if (!valid) {
    attempts.set(key, { count: current && current.until > now ? current.count + 1 : 1, until: now + 15 * 60 * 1000 })
    throw createError({ statusCode: 401, statusMessage: 'Incorrect password' })
  }
  attempts.delete(key)
  const token = await createAdminSession(String(config.vpsAdminUser), String(config.vpsAdminHash))
  setCookie(event, 'kaimafind_admin', token, { httpOnly: true, sameSite: 'strict', secure: url.protocol === 'https:' || getHeader(event, 'x-forwarded-proto') === 'https', path: '/', maxAge: adminSessionMaxAge })
  setHeader(event, 'Cache-Control', 'no-store')
  return { ok: true }
})
