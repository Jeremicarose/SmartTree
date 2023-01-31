pragma solidity ^0.8.0;

contract Tree {

    struct TreeInfo {
        bytes32 proofOfPlanting;
        bytes32 proofOfLife;
        bytes32 coordinates;
        bytes32 species;
        uint timestamp;
        address stewardId;
        bytes32 parentZone;
    }

    event NewTree(address indexed steward, bytes32 indexed proofOfPlanting, bytes32 indexed proofOfLife, bytes32 species);
    mapping(bytes32 => TreeInfo) private trees;
    address private owner;

    constructor() public {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Access denied. Only owner can perform this action.");
        _;
    }

    function plantTree(bytes32 _proofOfPlanting, bytes32 _proofOfLife, bytes32 _coordinates, bytes32 _species, address _stewardId, bytes32 _parentZone) public {
        require(_coordinates.length <= 32, "coordinates too long");
        require(_species.length <= 32, "species too long");
        require(_parentZone.length <= 32, "parentZone too long");
        trees[_proofOfPlanting] = TreeInfo(_proofOfPlanting, _proofOfLife, _coordinates, _species, block.timestamp, _stewardId, _parentZone);
        emit NewTree(_stewardId, _proofOfPlanting, _proofOfLife, _species);
    }

    function updateTreeLife(bytes32 _proofOfPlanting, bytes32 _newProofOfLife) public {
        require(trees[_proofOfPlanting].proofOfPlanting == _proofOfPlanting, "Invalid proof of planting.");
        trees[_proofOfPlanting].proofOfLife = _newProofOfLife;
    }

    function getTreeInfo(bytes32 _proofOfPlanting) public view returns (bytes32, bytes32, bytes32, bytes32, uint, address, bytes32) {
        return (trees[_proofOfPlanting].proofOfPlanting, trees[_proofOfPlanting].proofOfLife, trees[_proofOfPlanting].coordinates, trees[_proofOfPlanting].species, trees[_proofOfPlanting].timestamp, trees[_proofOfPlanting].stewardId, trees[_proofOfPlanting].parentZone);
    }

    function changeOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Invalid new owner address.");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    function renounceOwnership() public onlyOwner {
        emit OwnershipRenounced(owner);
        owner = address(0);
    }

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event OwnershipRenounced(address indexed previousOwner);
}
