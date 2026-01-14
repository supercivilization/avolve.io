// Web version - localhost is always 'localhost' on web
export function getLocalhost() {
  return 'localhost'
}

// On web, we don't need to replace localhost
export function replaceLocalhost(address: string) {
  return address
}
