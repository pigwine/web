export async function verifyBasicCredential(header:string|undefined,user:string,storedHash:string):Promise<boolean> {
  if(!header?.startsWith('Basic ') || !user || !storedHash) return false
  const [algorithm,roundsText,saltHex,hashHex]=storedHash.split(':')
  const rounds=Number(roundsText)
  if(algorithm!=='pbkdf2-sha256'||!Number.isSafeInteger(rounds)||rounds<100000||!/^[a-f0-9]{32}$/.test(saltHex||'')||!/^[a-f0-9]{64}$/.test(hashHex||'')) return false
  let decoded:string
  try { decoded=atob(header.slice(6)) } catch { return false }
  const separator=decoded.indexOf(':')
  if(separator<0||decoded.slice(0,separator)!==user) return false
  const password=decoded.slice(separator+1)
  const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits'])
  const salt=Uint8Array.from(saltHex!.match(/../g)!,part=>parseInt(part,16))
  const actual=new Uint8Array(await crypto.subtle.deriveBits({name:'PBKDF2',salt,iterations:rounds,hash:'SHA-256'},key,256))
  const expected=Uint8Array.from(hashHex!.match(/../g)!,part=>parseInt(part,16))
  let mismatch=0
  for(let i=0;i<expected.length;i++) mismatch|=actual[i]!^expected[i]!
  return mismatch===0
}
