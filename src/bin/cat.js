import { createReadStream } from 'node:fs'
import { getArgs } from '../lib/utils.js'

const [file] = getArgs()

if (!file) {
  console.log(`Invalid input, you must provide target path`)
  process.exit(1)
}

const readStream = createReadStream(file, { encoding: 'utf-8' })

readStream.on('error', (err) => {
  console.log(`Operation failed, ${err.message}`)
})

readStream.pipe(process.stdout)
