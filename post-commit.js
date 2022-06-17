const utils = require('./utils')
const packageConfig = utils.getPackageConfig()

// check projectName in package.json
if (!packageConfig.projectName) {
  utils.log('we needs package.json > yeeeha > projectName')
  return
}

// get last commit info
const commitInfo = utils.execute('git log -1')
const commitAuthor = utils.getCommitAuthor(commitInfo)
const commitDate = utils.getCommitDate(commitInfo)
const commitHash = utils.getCommitHash(commitInfo)

// send data to GA
utils.collet({
  userName: utils.encrypt(commitAuthor),
  eventName: 'commit',
  projectName: packageConfig.projectName,
  date: commitDate
})
