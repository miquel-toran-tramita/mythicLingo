import { rename } from 'node:fs/promises'
import path from 'path'

await rename(path.resolve('src/pages/private'), path.resolve('tmp'))

console.log(`🌑 Private pages moved from /pages`)
