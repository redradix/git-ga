const { execSync } = require('child_process')
const { createHmac } = require('node:crypto')
const axios = require('axios')
const os = require('os')
const path = require('path')
const constants = require('./constants')

const execute = command => {
  return execSync(command).toString()
}

const getPackageConfig = () => {
  const json = require(path.join(__dirname, '../../package.json'))
  return json['yeeeha'] || {}
}

const getCommitHash = info => {
  const prefix = 'commit'
  const line = getMessageLine(info, prefix)
  return getLineData(line, prefix)
}

const getCommitAuthor = info => {
  const prefix = 'Author:'
  const line = getMessageLine(info, prefix)
  const author = getLineData(line, prefix)
  const authorMatches = author.match(/\<(.*)\>/)
  return authorMatches?.length ? authorMatches[1] : author
}

const getCommitDate = info => {
  const prefix = 'Date:'
  const line = getMessageLine(info, prefix)
  return getLineData(line, prefix)
}

const log = message => {
  console.log(`\u001b[33mYEEEHA:\u001b[37m ${message}\n`)
}

const encrypt = text => {
  const secret = 'abcdefg'
  const hash = createHmac('sha256', secret).update(text).digest('hex')
  return hash
}

const collet = data => {
  axios
    .post(constants.serverUrl, data)
    .then(() => {
      log(`sent commit metrics to Yeeeha ${JSON.stringify(data)}`)
    })
    .catch(e => {
      log(e)
    })
}

// helpers

const getMessageLine = (info, prefix) => {
  const lines = info.split(os.EOL)
  return lines.find(line => line.startsWith(prefix))
}

const getLineData = (line, prefix) => {
  const regex = new RegExp(`${prefix}(.*)`)
  const match = regex.exec(line)
  return match.length ? match[1].trim() : ''
}

module.exports = {
  collet,
  encrypt,
  execute,
  getCommitAuthor,
  getCommitHash,
  getCommitDate,
  getPackageConfig,
  log
}
