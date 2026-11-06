import {describe,it,expect} from 'vitest'
import {pbkdf2Sync} from 'node:crypto'
import {verifyBasicCredential} from '../server/utils/basic-auth'

describe('VPS administrator authentication',()=>{
 it('accepts the configured password and rejects another password or user',async()=>{
  const salt='ab'.repeat(16)
  const stored=`pbkdf2-sha256:120000:${salt}:${pbkdf2Sync('correct-horse',Buffer.from(salt,'hex'),120000,32,'sha256').toString('hex')}`
  const basic=(user:string,password:string)=>'Basic '+Buffer.from(`${user}:${password}`).toString('base64')
  expect(await verifyBasicCredential(basic('admin','correct-horse'),'admin',stored)).toBe(true)
  expect(await verifyBasicCredential(basic('admin','wrong'),'admin',stored)).toBe(false)
  expect(await verifyBasicCredential(basic('other','correct-horse'),'admin',stored)).toBe(false)
  expect(await verifyBasicCredential(undefined,'admin',stored)).toBe(false)
 })
})
