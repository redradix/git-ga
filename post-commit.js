const utils = require('./utils')

// check account id in package.json

const packageConfig = utils.getPackageConfig()
if (!packageConfig.proyectName) {
  utils.log('we needs package.json > git-ga > proyectName')
  return
}

// get last commit info

const commitInfo = utils.execute('git log -1')
const commitHash = utils.getCommitHash(commitInfo)
const commitAuthor = utils.getCommitAuthor(commitInfo)
const commitDate = utils.getCommitDate(commitInfo)
utils.log(commitHash)
utils.log(commitAuthor)
utils.log(commitDate)

// send data to GA

// userName
// eventName
// proyectName
// date
// hour