const IPFS = require('ipfs-api')
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
async function testIPFSConnection() {
    try {
        const nodeId = await ipfs.id()
        console.log(`Connected to IPFS node with ID: ${nodeId.id}`)
    } catch (err) {
        console.error(err)
    }
}
