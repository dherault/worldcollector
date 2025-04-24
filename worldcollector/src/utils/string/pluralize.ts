function pluralize(string: string, n: number) {
  if (string.endsWith('s')) return string
  if (string.endsWith('y')) return `${string.slice(0, -1)}ies`

  return `${string}${n > 1 ? 's' : ''}`
}

export default pluralize
