import { readdir } from 'node:fs/promises'
import { truncateString } from '../lib/utils.js'

const dirContents = await readdir('.', { withFileTypes: true })

dirContents.sort((a, b) => {
  if (a.isDirectory() && b.isFile()) return -1

  return a.name.localeCompare(b.name)
})

const dirInfo = dirContents.map((dir) => ({
  Name: truncateString(dir.name),
  Type: dir.isFile() ? 'file' : 'directory',
}))

console.table(dirInfo)
