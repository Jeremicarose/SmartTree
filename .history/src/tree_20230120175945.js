const IPFS = require('ipfs-api');
const ipfs = new IPFS();

// Create a file with tree information
let treeData = {
    proofOfPlanting: _proofOfPlanting,
    proofOfLife: _proofOfLife,
    coordinates: _coordinates,
    species: _species,
    stewardId: _stewardId,
    parentZone: _parentZone
}
let treeJson = JSON.stringify(treeData);
let treeFile = new File([treeJson], 'tree.json', { type: 'application/json' });

// Add the file to IPFS
ipfs.files.add(treeFile, (err, files) => {
    if (err) {
        console.log(err);
    }
    let ipfsHash = files[0].hash;
    // call the "plantTree" function in the smart contract and pass in the IPFS hash as an argument
    treeContract.plantTree(ipfsHash, _proofOfLife, _coordinates, _species, _stewardId, _parentZone);
});
