const ipfs = require('../src/Ipfs.js')

describe('IPFS Connection', () => {
    it('should connect to IPFS', async () => {
        await ipfs.testIPFSConnection()
    })
})
