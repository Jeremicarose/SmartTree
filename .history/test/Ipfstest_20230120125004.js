const ipfs = require('ipfs.js')

describe('IPFS Connection', () => {
    it('should connect to IPFS', async () => {
        await ipfs.testIPFSConnection()
    })
})
