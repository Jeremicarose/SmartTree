const TreeNFT = artifacts.require("TreeNFT");

contract("TreeNFT", (accounts) => {
  const owner = accounts[0];
  const tokenID = 1;
  const species = "Maple";
  const age = 10;
  const location = "123 Main St.";
  const proofOfPlant = "QmXfGHQ2KbDTmHNRQ2z1YjuF9KoUbW6TjJLwN4sNpL8y4W";
  const proofOfLife = "QmXfGHQ2KbDTmHNRQ2z1YjuF9KoUbW6TjJLwN4sNpL8y4L";
  let treeNFT;

  beforeEach(async () => {
    treeNFT = await TreeNFT.new();
  });

  it("should mint a new tree NFT", async () => {
    await treeNFT.mint(owner, tokenID, species, age, location, proofOfPlant, proofOfLife);
    const treeInfo = await treeNFT.getTreeInfo(tokenID);
    assert.equal(treeInfo[0], species);
    assert.equal(treeInfo[1], age);
    assert.equal(treeInfo[2], location);
    assert.equal(treeInfo[3], proofOfPlant);
    assert.equal(treeInfo[4], proofOfLife);
  });

  it("should update the age of a tree NFT", async () => {
    await treeNFT.mint(owner, tokenID, species, age, location, proofOfPlant, proofOfLife);
    const newAge = age + 1;
    await treeNFT.updateTreeAge(tokenID, newAge);
    const treeInfo = await treeNFT.getTreeInfo(tokenID);
    assert.equal(treeInfo[1], newAge);
  });

  it("should update the proof of plant of a tree NFT", async () => {
    await treeNFT.mint(owner, tokenID, species, age, location, proofOfPlant, proofOfLife);
    const newProofOfPlant = "QmXfGHQ2KbDTmHNRQ2z1YjuF9KoUbW6TjJLwN4sNpL8y4Z";
    await treeNFT.updateProofOfPlant(tokenID, newProofOfPlant);
    const treeInfo = await treeNFT.getTreeInfo(tokenID);
    assert.equal(treeInfo[3], newProofOfPlant);
  });

  it("should update the proof of life of a tree NFT", async () => {
    await treeNFT.mint(owner, tokenID, species, age, location, proofOfPlant, proofOfLife);
    const newProofOfLife = "QmXfGHQ2KbDTmHNRQ2z1YjuF9KoUbW6TjJLwN4sNpL8y4M";
    await treeNFT.updateProofOfLife(tokenID, newProofOfLife);
    const treeInfo = await treeNFT.getTreeInfo(tokenID);
    assert.equal(treeInfo[4], newProofOfLife);
  });

});