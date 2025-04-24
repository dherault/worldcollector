function getCleanUrl() {
  return window.location.href.replace(window.location.hash, '').replace(window.location.search, '')
}

export default getCleanUrl
