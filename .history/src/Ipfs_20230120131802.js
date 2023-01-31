const IPFS = require('ipfs-api')
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

async function storeTreeInfoOnIPFS(proofOfPlanting) {
    // Get the TreeInfo struct from the contract
    const treeInfo = await tree.getTreeInfo(proofOfPlanting)

    // Convert the struct to a buffer
    const treeInfoBuffer = Buffer.from(JSON.stringify(treeInfo))

    // Add the buffer to IPFS
    const result = await ipfs.add(treeInfoBuffer)

    // Log the resulting hash
    console.log(`Tree info stored on IPFS with hash: ${result[0].hash}`)
}

module.exports = {
    testIPFSConnection: async function() {
        try {
            const nodeId = await ipfs.id()
            console.log(`Connected to IPFS node with ID: ${nodeId.id}`)
        } catch (err) {
            console.error(err)
        }
    }
}
