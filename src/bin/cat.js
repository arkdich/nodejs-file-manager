import { createReadStream } from 'node:fs'

const file = process.argv[2]

const readStream = createReadStream(file, { encoding: 'utf-8' })

readStream.on('error', (err) => {
  if (err.code === 'EISDIR') {
    throw new Error('Error, target must be a file')
  } else {
    throw err
  }
})

readStream.pipe(process.stdout)
