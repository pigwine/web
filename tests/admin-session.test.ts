import { describe, expect, it } from 'vitest'
import { createAdminSession, verifyAdminSession } from '../server/utils/admin-session'

describe('administrator session', () => {
  it('accepts a current signed session and rejects tampering, expiry and password rotation', async () => {
    const now = 1_800_000_000_000
    const token = await createAdminSession('editor', 'private-password-hash', now)
    expect(await verifyAdminSession(token, 'editor', 'private-password-hash', now + 1000)).toBe(true)
    expect(await verifyAdminSession(token, 'editor', 'another-hash', now + 1000)).toBe(false)
    expect(await verifyAdminSession(token, 'editor', 'private-password-hash', now + 8 * 24 * 60 * 60 * 1000)).toBe(false)
    expect(await verifyAdminSession(token.slice(0, -1) + 'x', 'editor', 'private-password-hash', now + 1000)).toBe(false)
  })
})
