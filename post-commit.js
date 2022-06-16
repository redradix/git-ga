const utils = require('./utils')
const packageConfig = utils.getPackageConfig()

// check projectName in package.json
if (!packageConfig.projectName) {
  utils.log('we needs package.json > yeeeha > projectName')
  return
}

// get last commit info
const commitInfo = utils.execute('git log -1')
const commitHash = utils.getCommitHash(commitInfo)
const commitAuthor = utils.getCommitAuthor(commitInfo)
const commitDate = utils.getCommitDate(commitInfo)

// send data to GA
utils.collet({
  commitHash,
  commitAuthor,
  commitDate,
  projectName: packageConfig.projectName
})
