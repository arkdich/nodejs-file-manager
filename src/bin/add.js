import path from 'node:path'
import fs from 'node:fs'

const [, , name, contents = '', encoding = 'utf-8'] = process.argv

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
