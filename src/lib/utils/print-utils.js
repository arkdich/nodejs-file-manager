export const printWorkingDirectory = () => {
  process.stdout.write(`You are currently in ${process.cwd()}\n`)
}

export const truncateString = (value, max = 40, postfix = '...') => {
  if (typeof value !== 'string') {
    throw new Error('Invalid value, must be of type string')
  }

  return value.length >= max ? value.substring(0, max).concat(postfix) : value
}
