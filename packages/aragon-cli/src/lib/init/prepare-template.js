import path from 'path'
import fs from 'fs-extra'

export async function prepareTemplate (basename, appName) {
  const arappPath = path.resolve(basename, 'arapp.json')
  const arapp = await fs.readJson(arappPath)

  // TODO remove once the old arapp.json is no longer supported
  if (!arapp.environments) {
    arapp.environments = {}
  }

  const props = {
    network: 'development',
    appName: appName
  }

  if (arapp.environments.default) {
    Object.assign(arapp.environments.default, props)
  } else {
    arapp.environments.default = props
  }

  // remove old arapp.json props
  delete arapp.appName
  delete arapp.version

  const gitFolderPath = path.resolve(basename, '.git')

  return Promise.all([
    fs.writeJson(arappPath, arapp, { spaces: 2 }),
    fs.remove(gitFolderPath)
  ])
}
