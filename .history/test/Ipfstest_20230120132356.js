const ipfs = require('../src/ipfs.js')
const Tree = require('.');

describe('Store Tree Info on IPFS', () => {
  it('should store tree info on IPFS and return hash', async () => {
    //create a mock TreeInfo object
    const mockTreeInfo = {
      proofOfPlanting: '0x1234',
      proofOfLife: '0x5678',
      coordinates: '121.23,32.34',
      species: 'Oak',
      timestamp: 1623471235,
      stewardId: '0x89Cc148B89BCa62C5c80A1D66d18c94194e23e62',
      parentZone: 'Central Park'
    };

    const hash = await Tree.storeTreeInfoOnIPFS(mockTreeInfo, ipfs);
    //assert that the function returns a hash
    assert.isString(hash);
    //retrieve the stored TreeInfo from IPFS using the returned hash
    const retrievedTreeInfo = await ipfs.get(hash);
    //assert that the retrieved TreeInfo is the same as the original mock TreeInfo
    assert.deepEqual(retrievedTreeInfo, mockTreeInfo);
  });
});

describe('IPFS Connection', () => {
    it('should connect to IPFS', async () => {
        await ipfs.testIPFSConnection()
    })
})

module.exports = {
    testIPFSConnection: ipfs.testIPFSConnection
}

