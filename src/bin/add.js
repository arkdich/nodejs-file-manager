import path from 'node:path'
import { writeFile } from 'node:fs/promises'
import { getArgs, paintText } from '../lib/utils.js'

const [name, contents = '', encoding = 'utf-8'] = getArgs()

if (!name) {
  console.log(`Invalid input, you must provide destination path`)
  process.exit(1)
}

try {
  await writeFile(name, contents, { encoding, flag: 'wx' })

  console.log(`Successfully created file ${paintText(name)}`)
} catch (err) {
  console.log(`Operation failed, ${err.message}`)
  process.exitCode = 1
}
