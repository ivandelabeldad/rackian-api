require('jest')

const httpMocks = require('node-mocks-http')
const { validationResult } = require('express-validator/check')
const Folder = require('./Folder')

let req = httpMocks.createRequest()

beforeEach(() => {
  req.body = {
  }
})

describe('Folder', () => {
  it('Should not throw error on empty constructor or with an object', () => {
    expect(() => new Folder()).not.toThrowError()
    expect(() => new Folder({})).not.toThrowError()
  })

  it('Should assign properties correctly', () => {
    const folder = new Folder({
      url: 'url',
      id: 'id',
      name: 'name',
      parentFolder: 'parentFolder',
      files: 'files',
      links: 'links'
    })
    expect(folder.url).toBe('url')
    expect(folder.id).toBe('id')
    expect(folder.name).toBe('name')
    expect(folder.parentFolder).toBe('parentFolder')
    expect(folder.files).toBe('files')
    expect(folder.links).toBe('links')
  })

  it('FromArray should transform objects into Folders', () => {
    const obj = {
      name: 'folderName',
      nonExists: 'nonExists'
    }
    const result = Folder.fromArray([obj])
    expect(result.length).toBe(1)
    expect(result[0].name).toBe('folderName')
    expect(result[0].nonExists).toBeUndefined()
  })

  it('Validation should not validate if name does not exists', () => {
    const done = []

    Folder.validation().forEach(async fn => {
      done.push(new Promise(resolve => {
        fn(req, null, resolve)
      }))
    })

    Promise.all(done).then(() => {
      expect(validationResult(req).isEmpty()).toBeFalsy()
      expect(validationResult(req).mapped()).toHaveProperty('name')
    })
  })
})
