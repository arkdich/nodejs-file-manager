export const printWorkingDirectory = () => {
  process.stdout.write(`You are currently in ${process.cwd()}\n`)
}
