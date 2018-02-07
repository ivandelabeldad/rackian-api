require('jest')

jest.mock('./utils/db.js', () => {
  return {}
})
const app = {
  use: jest.fn(),
  listen: jest.fn()
}
jest.doMock('express', () => {
  return () => {
    return app
  }
})
jest.mock('body-parser')

const server = require('./server')
const bodyParser = require('body-parser')
bodyParser.json = jest.fn(() => 'bodyParser.json')

describe('Server', () => {
  it('Start should load bodyParser.json', async () => {
    server.start()
    expect(app.use).toBeCalledWith(bodyParser.json())
  })

  it('Start should call listen on the correct port', async () => {
    server.start()
    expect(app.listen).toBeCalledWith(process.env.PORT || 3000, expect.anything())
  })

  it('Stop should close application', async () => {
    process.exit = jest.fn()
    server.stop()
    expect(process.exit).toBeCalledWith(0)
  })
})