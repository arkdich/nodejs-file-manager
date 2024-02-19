export const AVAILABLE_COMMANDS = [
  {
    name: 'up',
    desc: 'Go upper from current directory',
  },
  {
    name: 'cd',
    desc: 'Go to dedicated folder from current directory.',
  },
  {
    name: 'ls',
    desc: 'Print in console list of all files and folders in the current directory.',
  },
  {
    name: 'cat',
    desc: 'Read file and print its content in console.',
  },
  {
    name: 'add',
    desc: 'Create a file in the current working directory.',
  },
  { name: 'rn', desc: 'Rename file.' },
  { name: 'cp', desc: 'Copy file.' },
  {
    name: 'mv',
    desc: 'Move file.',
  },
  { name: 'rm', desc: 'Delete file.' },
  {
    name: 'os',
    desc: 'Get info about operating system.\n\n--EOL - Get EOL (default system End-Of-Line).\n--cpus - Get host machine CPUs info.\n--homedir - Get home directory.\n--username - Get current system user name.\n--architecture - Get CPU architecture for which Node.js binary has compiled.\n',
  },
  {
    name: 'hash',
    desc: 'Calculate hash for a file and print it into the console.',
  },
  {
    name: 'compress',
    desc: 'Compress file using Brotli algorithm.',
  },
  {
    name: 'decompress',
    desc: 'Decompress file using Brotli algorithm.',
  },
  { name: 'help', desc: 'Print list of available commands.' },
  { name: '.exit', desc: 'Terminate process.' },
]
