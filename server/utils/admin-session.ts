const lifetime = 7 * 24 * 60 * 60 * 1000

async function signingKey(secret: string) {
  return crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify'])
}

export async function createAdminSession(user: string, secret: string, now = Date.now()) {
  const payload = Buffer.from(JSON.stringify({ user, expires: now + lifetime })).toString('base64url')
  const signature = await crypto.subtle.sign('HMAC', await signingKey(secret), new TextEncoder().encode(payload))
  return `${payload}.${Buffer.from(signature).toString('base64url')}`
}

export async function verifyAdminSession(token: string | undefined, user: string, secret: string, now = Date.now()) {
  if (!token || !user || !secret) return false
  const parts = token.split('.')
  if (parts.length !== 2 || !parts[0] || !parts[1]) return false
  try {
    const payload = JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf8'))
    if (payload.user !== user || !Number.isSafeInteger(payload.expires) || payload.expires <= now || payload.expires > now + lifetime) return false
    const signature = Buffer.from(parts[1], 'base64url')
    return crypto.subtle.verify('HMAC', await signingKey(secret), signature, new TextEncoder().encode(parts[0]))
  } catch { return false }
}

export const adminSessionMaxAge = lifetime / 1000
