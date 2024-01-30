import { createReadStream } from 'node:fs'
import { getArgs } from '../lib/utils.js'

const [file] = getArgs()

const readStream = createReadStream(file, { encoding: 'utf-8' })

readStream.on('error', (err) => {
  if (err.code === 'EISDIR') {
    console.log('Error, target must be a file')
  } else if (err.code === 'ENOENT') {
    console.log(`Error, file ${err.path} doesn't exist`)
  } else {
    throw err
  }
})

readStream.pipe(process.stdout)
