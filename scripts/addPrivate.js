import { rename } from 'node:fs/promises'
import path from 'path'

await rename(path.resolve('tmp'), path.resolve('src/pages/private'))

console.log(`🌕 Private pages moved to /pages`)
