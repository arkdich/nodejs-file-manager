import path from 'node:path'
import fs from 'node:fs/promises'
import os from 'node:os'
import { parseArgs } from './lib/parse-args.js'
import { fork } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import {
  getCommandPath,
  paintText,
  printPrompt,
  printWorkingDirectory,
  shutdown,
} from './lib/utils.js'
import { AVAILABLE_COMMANDS } from './lib/constants.js'

const args = parseArgs(process.argv)
const exitPrompt = `Thank you for using File Manager, ${paintText(
  args.username
)}, goodbye!`

process.chdir(os.homedir())

if (args.username) {
  console.log(`Welcome to the File Manager, ${paintText(args.username)}!`)
}

printWorkingDirectory()
printPrompt()

process.stdin.setEncoding('utf-8').on('data', async (input) => {
  const parsedInput = input.trim().split(' ')

  const command = parsedInput[0]
  const args = parsedInput.slice(1)

  if (!AVAILABLE_COMMANDS.some((cmd) => cmd.name === command)) {
    console.log(`Invalid input, command ${paintText(command)} is not supported`)
    printPrompt()

    return
  }

  switch (command) {
    case '.exit':
      shutdown(exitPrompt)
      return
    case 'up':
    case 'cd':
      process.chdir(args[0] ?? '..')
      printWorkingDirectory()
      printPrompt()
      return
  }

  const cmdPath = getCommandPath(command)
  const child = fork(cmdPath, args)

  child.on('close', () => {
    printWorkingDirectory()
    printPrompt()
  })
})

process.on('SIGINT', () => {
  shutdown(exitPrompt)
})
