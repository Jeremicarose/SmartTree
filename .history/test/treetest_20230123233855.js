const IPFS = require('ipfs-api');
const ipfs = new IPFS();
const Web3 = require('web3');
const contractJson = require("../build/contracts/Tree.json");
const treeContractABI = contractJson.abi;
const treeContractAddress = "0x9B4b06832d6334ca2A23c831E98013616Ffd33f6";

let web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'));
let treeContract = new web3.eth.Contract(treeContractABI, treeContractAddress);

describe('plantTree', () => {
    let _proofOfPlanting = "0x1234567890abcdef";
    let _proofOfLife = "0x0987654321fedcba";
    let _coordinates = "12.34,56.78";
    let _species = "Oak";
    let _stewardId = "0x0123456789abcdef";
    let _parentZone = "Zone A";

    it('should plant a tree', async () => {
        let treeData = {
            proofOfPlanting: _proofOfPlanting,
            proofOfLife: _proofOfLife,
            coordinates: _coordinates,
            species: _species,
            stewardId: _stewardId,
            parentZone: _parentZone
        };
        let treeJson = JSON.stringify(treeData);
        let treeFile = new File([treeJson], 'tree.json', { type: 'application/json' });
        let ipfsHash;

        // Add the file to IPFS
ipfs.files.add(treeFile, (err, files) => {
  if (err) {
  console.log(err);
  }
  ipfsHash = files[0].hash;
  });
  
  
