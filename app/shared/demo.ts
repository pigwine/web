import type { Locale, PublicItem } from './content'
const examples=[
 ['field-notes','media','2025','portrait','观看的方式','Ways of seeing','影像与表达的练习。','An ongoing study of images and expression.'],
 ['quiet-structure','career','2024','architecture','秩序之外','Beyond the lines','关于空间、工作与创造的观察。','Observations on space, work and making.'],
 ['long-way','health','2026','mountain','走远一点','The long way home','把身体放回真实的世界。','Finding a rhythm in the world outside.'],
 ['small-things','learning','2025','flowers','日常的切片','An ordinary kind of beauty','从微小的事物中，重新学习观察。','Learning to notice the smaller things.'],
 ['practice','health','2026','motion','持续练习','A practice, not a finish line','一点点积累，而非一次抵达。','Small repetitions. A longer perspective.'],
 ['after-hours','finance','2024','city','城市的另一面','After hours','记录选择，以及选择之后的生活。','On choices, possibilities and the lives between.']
]
export function demoItems(locale:Locale):PublicItem[]{return examples.map((x,i)=>({
 id:x[0]!,kind:'project',branchId:x[1]!,date:x[2]!,cover:'/preview/'+x[3]+'.jpg',media:[],relatedBranches:[],projectId:null,endDate:'',status:'ongoing',featured:true,order:i,achievement:false,deliverable:false,publishedAt:'',sample:true,
 translation:{title:x[locale==='zh'?4:5]!,summary:x[locale==='zh'?6:7]!,body:{type:'doc',content:[{type:'paragraph',content:[{type:'text',text:locale==='zh'?'这是用于确认视觉风格的示例项目，并非 Kaima 的真实经历或作品。你可以在内容后台创建自己的项目、上传图片，再选择是否加入作品导览。':'This is a visual study, not an actual project or personal achievement. Create your own project in the studio, upload images and select it for the portfolio.'}]}]}}
}))}
