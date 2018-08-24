function replaceAll1 (val, str) {
  var regx = new RegExp(`^${str}$`, 'g')
  return val.replace(regx, '')
}

function replaceAll2 (val, str) {
  return val.split(str).join('')
}
