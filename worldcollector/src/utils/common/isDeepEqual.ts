function isDeepEqual(a: any, b: any) {
  return JSON.stringify(a) === JSON.stringify(b)
}

export default isDeepEqual
