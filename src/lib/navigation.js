import { readdir } from 'node:fs/promises'
import { truncateString } from './utils/print-utils.js'

export const goUpInFileSystem = () => {
  process.chdir('..')
}

export const changeDirectory = (dir) => {
  process.chdir(dir)
}

export const listDirectory = async () => {
  const dirContents = await readdir('.', { withFileTypes: true })

  const dirInfo = dirContents.map((dir) => ({
    Name: truncateString(dir.name),
    Type: dir.isFile() ? 'file' : 'directory',
  }))

  console.table(dirInfo)
}
