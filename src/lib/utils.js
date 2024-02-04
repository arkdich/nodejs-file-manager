import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const printWorkingDirectory = () => {
  const cwd = process.cwd()

  console.log(`You are currently in ${paintText(cwd, 'green')}`)
}

export const printPromt = () => {
  process.stdout.write(
    `To list all available command enter ${paintText('help', 'green')}\n> `
  )
}

export const truncateString = (value, max = 40, postfix = '...') => {
  if (typeof value !== 'string') {
    throw new Error('Invalid value, must be of type string')
  }

  return value.length >= max ? value.substring(0, max).concat(postfix) : value
}

export const shutdown = (prompt) => {
  console.log(prompt)
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

export const paintText = (text, color = 'green') => {
  let colorCode = ''

  switch (color) {
    case 'green':
      colorCode = '\x1b[32m'
  }

  return `${colorCode}${text}\x1b[0m`
}
