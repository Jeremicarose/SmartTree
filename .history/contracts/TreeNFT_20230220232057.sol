pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract TreeNFT is Initializable, ERC721Upgradeable, OwnableUpgradeable {
    // Struct for storing tree information
    struct Tree {
        string species;
        uint256 age;
        string location;
        string proofOfPlant;
        string proofOfLife;
    }

    // Mapping from token ID to tree information
    mapping (uint256 => Tree) private _treeInfo;

    // Event for when new tree NFT is minted
    event TreeMinted(address indexed owner, uint256 indexed tokenId, string species, uint256 age, string location);

    // Event for when tree age is updated
    event TreeAgeUpdated(address indexed owner, uint256 indexed tokenId, uint256 newAge);

    // Event for when tree proof of plant is updated
    event TreeProofOfPlantUpdated(address indexed owner, uint256 indexed tokenId, string newProofOfPlant);

    // Event for when tree proof of life is updated
    event TreeProofOfLifeUpdated(address indexed owner, uint256 indexed tokenId, string newProofOfLife);

    // Event for when tree species is updated
    event TreeSpeciesUpdated(address indexed owner, uint256 indexed tokenId, string newSpecies);

    // Initialize the contract
    function initialize() public initializer {
        __ERC721_init("TreeNFT", "TNFT");
        __Ownable_init();
    }

    // Mint a new tree NFT
    function mint(address to, uint256 tokenId, string memory species, uint256 age, string memory location, string memory proofOfPlant, string memory proofOfLife) public onlyOwner {
        _mint(to, tokenId);
        _setTreeInfo(tokenId, species, age, location, proofOfPlant, proofOfLife);
        emit TreeMinted(to, tokenId, species, age, location);
    }

    // Get the tree information for a given token ID
    function getTreeInfo(uint256 tokenId) public view returns (string memory, uint256, string memory, string memory, string memory) {
        require(_exists(tokenId), "Token ID does not exist");
        Tree memory tree = _treeInfo[tokenId];
        return (tree.species, tree.age, tree.location, tree.proofOfPlant, tree.proofOfLife);
    }

    // Update the age of a tree for a given token ID
    function updateTreeAge(uint256 tokenId, uint256 newAge) public onlyOwner {
        require(_exists(tokenId), "Token ID does not exist");
        _treeInfo[tokenId].age = newAge;
        emit TreeAgeUpdated(ownerOf(tokenId), tokenId, newAge);
    }

    // Update the proof of plant for a given token ID
    function updateProofOfPlant(uint256 tokenId, string memory newProofOfPlant) public onlyOwner {
        require(_exists(tokenId), "Token ID does not exist");
        _treeInfo[tokenId].proofOfPlant = newProofOfPlant;
        emit TreeProofOfPlantUpdated(ownerOf(tokenId), tokenId, newProofOfPlant);
    }

    // Update the proof of life for a given token ID
    function updateProofOfLife(uint256 tokenId, string memory newProofOfLife) public onlyOwner {
        require(_exists(tokenId), "Token ID does not
