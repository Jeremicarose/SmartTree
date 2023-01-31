// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Tree {
    struct TreeInfo {
        bytes32 proofOfPlanting;
        bytes32 proofOfLife;
        string coordinates;
        string species;
        uint256 timestamp;
        address stewardId;
        string parentZone;
    }

    event NewTree(
        address indexed steward,
        bytes32 indexed proofOfPlanting,
        bytes32 indexed proofOfLife,
        string species
    );
    mapping(bytes32 => TreeInfo) private trees;
    address private owner;

    constructor() {
        owner = msg.sender;
    }

    //modifier to check only owner should be able to call function
    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Access denied. Only owner can perform this action."
        );
        _;
    }

    //function to plantTree takeing 6 arguments and storing them in memory
    function plantTree(
        bytes32 _proofOfPlanting,
        bytes32 _proofOfLife,
        string memory _coordinates,
        string memory _species,
        address _stewardId,
        string memory _parentZone
    ) public {
        //validating the length of input
        require(bytes(_coordinates).length <= 32, "coordinates too long");
        require(bytes(_species).length <= 32, "species too long");
        require(bytes(_parentZone).length <= 32, "parentZone too long");
        //storing the data in memory
        trees[_proofOfPlanting] = TreeInfo(
            _proofOfPlanting,
            _proofOfLife,
            _coordinates,
            _species,
            block.timestamp,
            _stewardId,
            _parentZone
        );
        emit NewTree(_stewardId, _proofOfPlanting, _proofOfLife, _species);
    }

    function updateTreeLife(bytes32 _proofOfPlanting, bytes32 _newProofOfLife)
        public
    {
        require(
            trees[_proofOfPlanting].proofOfPlanting == _proofOfPlanting,
            "Invalid proof of planting."
        );
        //updating the proof of life
        trees[_proofOfPlanting].proofOfLife = _newProofOfLife;
    }

    function getTreeInfo(bytes32 _proofOfPlanting)
        public
        view
        returns (
            bytes32,
            bytes32,
            string memory,
            string memory,
            uint256,
            address,
            string memory
        )
    {
        // returning the information of tree in memory
        return (
            trees[_proofOfPlanting].proofOfPlanting,
            trees[_proofOfPlanting].proofOfLife,
            trees[_proofOfPlanting].coordinates,
            trees[_proofOfPlanting].species,
            trees[_proofOfPlanting].timestamp,
            trees[_proofOfPlanting].stewardId,
            trees[_proofOfPlanting].parentZone
        );
    }

    function changeOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Invalid new owner address.");
        //emitting event of OwnershipTransferred
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    function renounceOwnership() public onlyOwner {
        //emitting event of OwnershipRenounced
        emit OwnershipRenounced(owner);
        owner = address(0);
    }

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );
    event OwnershipRenounced(address indexed previousOwner);
}
