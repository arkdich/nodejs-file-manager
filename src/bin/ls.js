import { readdir } from 'node:fs/promises'
import { truncateString } from '../lib/utils.js'

const dirContents = await readdir('.', { withFileTypes: true })

const dirInfo = dirContents.map((dir) => ({
  Name: truncateString(dir.name),
  Type: dir.isFile() ? 'file' : 'directory',
}))

console.table(dirInfo)
