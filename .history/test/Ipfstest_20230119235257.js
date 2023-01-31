const IPFS = require('ipfs-http-client');
const chai = require('chai');
const expect = chai.expect;

describe('IPFS Configuration', () => {
    it('should connect to a remote IPFS node', async () => {
        const ipfs = new IPFS({ host: 'infura-ipfs.io', port: 5001, protocol: 'https' });
        const version = await ipfs.version();
        expect(version).to.have.property('version');
    });
});
