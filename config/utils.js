const path = require('path')

module.exports = {
  resolve (dir) {
    return path.join(__dirname, '..', dir)
  },

  assetsPath (_path) {
    const assetsSubDir = 'static'
    return path.posix.join(assetsSubDir, _path)
  }
}
