const TruffleContract = require('truffle-contract');
const { expect } = require('chai');
const { test } = require('mocha');
const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', key: '16eee3c4d10c4b3a9ff3f8c8163eedb5' });
const chai = require('chai');

//const mocha = require('mocha');

describe('IPFS', () => {
    let treeContract;
    before(async () => {
        // deploy or connect to the tree contract
        treeContract = await Tree.at('0xf31486FC00E4fF7ad47b3DEaa112B4E8D61710F3');
    });

    it('adds tree information to IPFS and return hash', async () => {
        // retrieve tree information from smart contract
        const treeInfoFromContract = await treeContract.getTreeInfo('0x1234567890abcdef');

        // create tree information
        const treeInfo = {
            proofOfPlanting: treeInfoFromContract[0],
            proofOfLife: treeInfoFromContract[1],
            coordinates: treeInfoFromContract[2],
            species: treeInfoFromContract[3],
            timestamp: treeInfoFromContract[4],
            stewardId: treeInfoFromContract[5],
            parentZone: treeInfoFromContract[6]
        };

        // convert tree information to json
        const jsonTreeInfo = JSON.stringify(treeInfo);

        // call IPFS add method and wait for response
        const added = await ipfs.add(jsonTreeInfo);

        // assert that the connection to IPFS is successful
        assert.isOk(added, 'Failed to connect to IPFS');

        // assert that the returned value is valid
        expect(added).to.have.property('hash');
        expect(added.hash).to.be.a('string');

        // retrieve tree information from IPFS
        const treeInfoFromIpfs = JSON.parse(await ipfs.cat(added.hash));

        // assert that the tree information matches the tree information stored in the smart contract
        assert.deepEqual(treeInfo, treeInfoFromIpfs, 'Tree information from IPFS does not match tree information from smart contract');
    });
});

