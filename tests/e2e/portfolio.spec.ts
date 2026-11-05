import {test,expect} from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
test('editorial shell is readable, localized and mobile responsive',async({page})=>{
 await page.goto('/zh');await expect(page.locator('h1')).toContainText('KAIMAFIND');await expect(page.getByRole('link',{name:'人生地图',exact:true})).toBeVisible()
 const scan=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(scan.violations).toEqual([])
 await page.getByRole('link',{name:'Switch to English'}).click();await expect(page.getByRole('link',{name:'Life map',exact:true})).toBeVisible()
 await page.setViewportSize({width:375,height:812});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)
 await page.screenshot({path:'test-results/home-mobile.png',fullPage:true})
})
test('draft, publish, unpublished edit and locale separation',async({page,request})=>{
 await page.goto('/admin');await page.waitForFunction(()=>!!(document.querySelector('#__nuxt') as any)?.__vue_app__);await page.getByRole('button',{name:'＋ 项目',exact:true}).click()
 const title='Test project '+Date.now();await page.getByLabel('标题',{exact:true}).fill(title);await page.getByLabel('简介',{exact:true}).fill('Draft content must stay private.')
 await page.getByRole('button',{name:'保存草稿',exact:true}).click();await expect(page.getByRole('status')).toContainText('草稿已保存')
 let publicData=await (await request.get('/api/public/content?locale=zh')).json();expect(JSON.stringify(publicData)).not.toContain(title)
 await page.getByRole('button',{name:'发布中文',exact:true}).click();await expect(page.getByRole('status')).toContainText('当前语言已发布')
 publicData=await (await request.get('/api/public/content?locale=zh')).json();const item=publicData.items.find((p:any)=>p.translation.title===title);expect(item).toBeTruthy()
 await page.getByLabel('标题',{exact:true}).fill(title+' private change');await page.getByRole('button',{name:'保存草稿',exact:true}).click();await expect(page.getByRole('status')).toContainText('草稿已保存')
 publicData=await (await request.get('/api/public/content?locale=zh')).json();expect(publicData.items.find((p:any)=>p.id===item.id).translation.title).toBe(title)
 const english=await (await request.get('/api/public/content?locale=en')).json();expect(english.items.some((p:any)=>p.id===item.id)).toBe(false)
 await page.getByRole('button',{name:'移入回收站',exact:true}).click();await expect(page.getByRole('status')).toContainText('已移入回收站')
})
test('rejects cross-origin mutations',async({request})=>{const response=await request.post('/api/admin/entry',{headers:{Origin:'https://untrusted.example'},data:{}});expect(response.status()).toBe(403)})
test('media permissions follow publication, and stale edits are rejected',async({request})=>{
 const headers={Origin:'http://127.0.0.1:3100'}
 const bytes=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+j2ioAAAAASUVORK5CYII=','base64')
 const upload=await request.post('/api/admin/upload',{headers,multipart:{file:{name:'pixel.png',mimeType:'image/png',buffer:bytes}}});expect(upload.ok()).toBe(true)
 const media=await upload.json()

 const id=crypto.randomUUID();const translation={title:'Media test',summary:'',body:{type:'doc',content:[]}}
 const draft={id,kind:'project',branchId:'career',relatedBranches:[],projectId:null,date:'2024',endDate:'',status:'ongoing',cover:media.url,media:[media.url],featured:false,order:0,achievement:false,deliverable:false,translations:{zh:translation,en:translation}}
 const saved=await request.post('/api/admin/entry',{headers,data:{draft,version:0}});expect(saved.ok()).toBe(true)
 const stale=await request.post('/api/admin/entry',{headers,data:{draft,version:0}});expect(stale.status()).toBe(409)
 const published=await request.post('/api/admin/action',{headers,data:{id,version:1,action:'publish',locale:'zh'}});expect(published.ok()).toBe(true)
 const publicResponse=await request.get(media.url);expect(publicResponse.ok()).toBe(true)
 expect(publicResponse.headers()['cache-control']).toContain('no-store')
 await request.post('/api/admin/action',{headers,data:{id,version:2,action:'unpublish',locale:'zh'}})
 await request.post('/api/admin/action',{headers,data:{id,version:3,action:'delete',locale:'zh'}})
})
