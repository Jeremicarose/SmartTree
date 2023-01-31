const ipfs = require('../src/IPFS')

describe('IPFS Connection', () => {
    it('should connect to IPFS', async () => {
        await ipfs.testIPFSConnection()
    })
})
