import fs from 'fs'
import path from 'path'

const statResolvers = {
  LOCAL_FS: filePath => {
    return new Promise((resolve, reject) => {
      fs.stat(filePath, (err, stat) => {
        if (err) return reject(err)

        resolve({
          size: stat.size,
          createdAt: stat.ctime,
          updatedAt: stat.mtime,
          accessedAt: stat.atime,
          isDirectory: stat.isDirectory()
        })
      })
    })
  }
}

const childResolvers = {
  LOCAL_FS: filePath => new Promise((resolve, reject) => {
    fs.readdir(filePath, (err, files) => {
      if (err) reject (err)
      resolve(files)
    })
  })
}

export default class Node {
  constructor (relativePath, fs) {
    this._relativePath = relativePath
    this._fs = fs
    this._absolutePath = path.join(config.context, this._relativePath)
    this._ext = path.extname(this._relativePath)
    this._didLoad = false

    this.extname = path.extname(this._relativePath)
    this.basename = path.basename(this._relativePath)
    this.dirname = path.dirname(this._relativePath)
    this.staticURL = path.posix.join(config.staticURLBase, this._relativePath)
    this.size = 0
    this.createdAt = null
    this.updatedAt = null
    this.accessedAt = null
    this.isDirectory = false
    this.exists = false
  }

  async _load () {
    if (this._didLoad) return
    const statResolver = statResolvers[this._fs]
    this._didLoad = true
    try {
      const stat = await statResolver(this._absolutePath)
      Object.assign(this, stat)
      this.exists = true
    } catch (e) {}
  }

  async resolve () {
    await this._load()
    return this
  }

  async children () {
    await this._load()
    if (!this.isDirectory) return null
    const childResolver = childResolvers[this._fs]
    const children = await childResolver(this._absolutePath)
    return Promise.all(
      children.map(fp => new Node(path.join(this._relativePath, fp)).resolve())
    )
  }
}
