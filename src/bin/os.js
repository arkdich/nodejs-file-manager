import { getArgs, paintText, printPromt } from '../lib/utils.js'
import os from 'node:os'

const [flag] = getArgs()

const AVAILABLE_FLAGS = [
  '--EOL',
  '--cpus',
  '--homedir',
  '--username',
  '--architecture',
]

if (!AVAILABLE_FLAGS.includes(flag)) {
  console.log(`Invalid input, ${paintText(flag)} is not supported`)
  process.exit(1)
}

if (flag === '--EOL') {
  console.log(
    `Your OS's default End-Of-Line is ${paintText(JSON.stringify(os.EOL))}`
  )
}

if (flag === '--cpus') {
  const cpus = os.cpus()

  console.log(
    `Overall amount of logical CPU cores is ${paintText(cpus.length)}\n`
  )

  cpus.forEach((cpu) => {
    const speed = (cpu.speed / 1000).toFixed(2)

    console.log(
      `Model: ${paintText(cpu.model, 'green')}\nSpeed: ${paintText(
        speed + 'Ghz'
      )}\n`
    )
  })
}

if (flag === '--homedir') {
  const { homedir } = os.userInfo()

  console.log(`Current user's home directory is ${paintText(homedir)}`)
}

if (flag === '--username') {
  const { username } = os.userInfo()

  console.log(`Current user's name is ${paintText(username)}`)
}

if (flag === '--architecture') {
  console.log(`CPU architecture is ${paintText(os.arch())}`)
}
