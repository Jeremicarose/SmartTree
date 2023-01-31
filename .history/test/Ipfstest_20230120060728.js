const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', key: '16eee3c4d10c4b3a9ff3f8c8163eedb5' });
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const mocha = require('mocha');

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
    });
});
