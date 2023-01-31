const IPFS = require('ipfs-api');
jest.mock('ipfs-api', () => {
  const add = jest.fn().mockResolvedValue([{ hash: 'QmHash' }])
  return jest.fn().mockImplementation(() => ({
    files: {
      add
    }
  }))
})

const ipfs = new IPFS();

describe('IPFS', () => {
    test('adds file to IPFS and returns correct hash', async () => {
        let treeData = {
            proofOfPlanting: 'proof1',
            proofOfLife: 'proof2',
            coordinates: 'coordinates1',
            species: 'species1',
            stewardId: 'address1',
            parentZone: 'zone1'
        }
        let treeJson = JSON.stringify(treeData);
        let treeFile = new File([treeJson], 'tree.json', { type: 'application/json' });

        let filesAdded = await ipfs.files.add(treeFile);
        expect(filesAdded[0].hash).toEqual('QmHash');
        expect(ipfs.files.add).toHaveBeenCalled()
    });
});
