import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const printWorkingDirectory = () => {
  console.log(`You are currently in ${process.cwd()}\n`)
}

export const truncateString = (value, max = 40, postfix = '...') => {
  if (typeof value !== 'string') {
    throw new Error('Invalid value, must be of type string')
  }

  return value.length >= max ? value.substring(0, max).concat(postfix) : value
}

export const shutdown = () => {
  console.log(
    `Thank you for using File Manager, ${global.inputArgs.username}, goodbye!\n`
  )

  process.exit(0)
}

export const getCommandPath = (command) => {
  const sourceDir = path.dirname(fileURLToPath(import.meta.url))
  const cmdPath = path.join(sourceDir, '..', 'bin', `${command}.js`)

  return cmdPath
}

export const getArgs = (start = 2) => {
  return process.argv.slice(start)
}
