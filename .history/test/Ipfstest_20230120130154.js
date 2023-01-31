const ipfs = require('../src/ipfs.js')

describe('IPFS Connection', () => {
    it('should connect to IPFS', async () => {
        await ipfs.testIPFSConnection()
    })
})

module.exports = {
    testIPFSConnection: ipfs.testIPFSConnection
}
