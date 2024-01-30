import path from 'node:path'
import fs from 'node:fs'
import { getArgs } from '../lib/utils.js'

const [name, contents = '', encoding = 'utf-8'] = getArgs()

try {
  await fs.promises.access(name, fs.constants.F_OK)

  console.log('Error, file already exists\n')
} catch (err) {
  if (err.code === 'ENOENT') {
    await fs.promises.writeFile(name, contents, { encoding })

    console.log(`Successfully created file ${name}`)
  } else {
    throw err
  }
}
