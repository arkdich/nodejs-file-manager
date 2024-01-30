import path from 'node:path'
import fs from 'node:fs'

export const printFileContents = (file) => {
  const readStream = fs.createReadStream(file, { encoding: 'utf-8' })

  readStream.on('error', (err) => {
    if (err.code === 'EISDIR') {
      throw new Error('Error, target must be a file')
    } else {
      throw err
    }
  })

  readStream.pipe(process.stdout)
}

export const createFile = async (name, contents = '', encoding = 'utf-8') => {
  try {
    await fs.promises.access(name, fs.constants.F_OK)

    throw new Error('Error, file already exists')
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.promises.writeFile(name, contents, { encoding })
    } else {
      throw err
    }
  }
}
