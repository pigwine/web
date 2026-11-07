export default defineEventHandler(event => {
  if (getHeader(event, 'origin') !== getRequestURL(event).origin) throw createError({ statusCode: 403, statusMessage: 'Invalid request origin' })
  deleteCookie(event, 'kaimafind_admin', { path: '/' })
  setHeader(event, 'Cache-Control', 'no-store')
  return { ok: true }
})
