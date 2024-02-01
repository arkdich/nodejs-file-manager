import path from 'node:path'
import fs from 'node:fs/promises'
import os from 'node:os'
import { parseArgs } from './lib/parse-args.js'
import { fork } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import {
  getCommandPath,
  printPromt,
  printWorkingDirectory,
  shutdown,
} from './lib/utils.js'
import { AVAILABLE_COMMANDS } from './lib/constants.js'

global.inputArgs = parseArgs(process.argv)
// process.chdir(os.homedir())

if (global.inputArgs.username) {
  process.stdout.write(
    `Welcome to the File Manager, ${global.inputArgs.username}!\n`
  )
}
printWorkingDirectory()
printPromt()

process.stdin.setEncoding('utf-8').on('data', async (input) => {
  const parsedInput = input.trim().split(' ')

  const command = parsedInput[0]
  const args = parsedInput.slice(1)

  if (!AVAILABLE_COMMANDS.some((cmd) => cmd.name === command)) {
    console.log(`Invalid input, command ${command} is not supported\n`)
    printPromt()

    return
  }

  switch (command) {
    case '.exit':
      shutdown()
      return
    case 'up':
    case 'cd':
      process.chdir(args[0] ?? '..')
      printWorkingDirectory()
      printPromt()
      return
  }

  const cmdPath = getCommandPath(command)
  const child = fork(cmdPath, args)

  child.on('close', () => {
    printWorkingDirectory()
    printPromt()
  })
})

process.on('SIGINT', shutdown)
