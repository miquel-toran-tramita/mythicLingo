import { readdir, writeFile } from 'node:fs/promises'
import path from 'path'

const pages = await readdir(path.resolve('src/pages'), { recursive: true })

let pageList = []

for (let page of pages) {
  if (page.includes('.astro')) {
    page = page.replaceAll('\\', '/').replace('.astro', '').replace('index', '')
    pageList.push('/' + page)
  }
}

await writeFile('src/constants/pageUrls.ts', `export const PAGE_URLS: string[] = ${JSON.stringify(pageList)}`)

console.log(`📜 ${pageList.length} URLS added to @/constants/pageUrls.ts`)
