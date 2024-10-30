import { readdir, readFile } from 'node:fs/promises'
import path from 'path'

let components = await readdir(path.resolve('./src/components'), { recursive: true })
let pages = await readdir(path.resolve('./src/pages'), { recursive: true })
let layouts = await readdir(path.resolve('./src/layouts'), { recursive: true })

components = components.filter((url) => url.includes('.svelte'))
pages = pages.filter((url) => url.includes('.astro'))
layouts = layouts.filter((url) => url.includes('.astro'))

const timesUsed = async (name, componentsArr = components) => {
  let counter = 0

  for (let url of componentsArr) {
    const data = await readFile('src/components/' + url, 'utf8')
    if (data.includes(name)) counter++
  }

  for (let url of pages) {
    const data = await readFile('src/pages/' + url, 'utf8')
    if (data.includes(name)) counter++
  }

  for (let url of layouts) {
    const data = await readFile('src/layouts/' + url, 'utf8')
    if (data.includes(name)) counter++
  }

  return counter
}

let summary = []
let componentsUsed = []
let deprecatedList = []

for (let url of components) {
  const name = url.split('\\').pop()

  const counter = await timesUsed(name)

  if (counter) {
    componentsUsed.push(url)

    summary.push({
      '🔍': '✅',
      '💥 Counter': counter,
      '🧩 Component': name,
      '🪧  Path': url,
    })
  } else {
    deprecatedList.push({
      '🔍': '❌',
      '💥 Counter': counter,
      '🧩 Component': name,
      '🪧  Path': url,
    })
  }
}

for (let url of componentsUsed) {
  const name = url.split('\\').pop()

  const counter = await timesUsed(name, componentsUsed)
  if (!counter) {
    summary.push({
      '🔍': '⚠️ ',
      '💥 Counter': counter,
      '🧩 Component': name,
      '🪧  Path': url,
    })
  }
}

summary = summary.concat(deprecatedList)

console.table(summary.sort((a, b) => b['💥 Counter'] - a['💥 Counter']))
