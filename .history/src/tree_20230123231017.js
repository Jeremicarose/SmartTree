const IPFS = require('ipfs-api');
const ipfs = new IPFS();
const Web3 = require('web3');
const treeContractABI = [ABI of your contract];
const treeContractAddress = "0x9B4b06832d6334ca2A23c831E98013616Ffd33f6";

let web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'));
let treeContract = new web3.eth.Contract(treeContractABI, treeContractAddress);

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
    treeContract.methods.plantTree(ipfsHash, _proofOfLife, _coordinates, _species, _stewardId, _parentZone).send({from: web3.eth.defaultAccount})
    .then(console.log)
    .catch(console.error);
});