const Tree = artifacts.require("Tree");

contract("Tree", (accounts) => {
  let treeInstance;

  before(async () => {
    treeInstance = await Tree.new({ from: accounts[0] });
  });

  it("should plant a tree", async () => {
    const proofOfPlanting =
      "0x1234000000000000000000000000000000000000000000000000000000000000";
    const proofOfLife =
      "0x5678000000000000000000000000000000000000000000000000000000000000";
    const coordinates = "12.34, 56.78";
    const species = "Oak";
    const stewardId = accounts[1];
    const parentZone = "Zone 1";
    const tx = await treeInstance.plantTree(
      proofOfPlanting,
      proofOfLife,
      coordinates,
      species,
      stewardId,
      parentZone,
      { from: accounts[0] }
    );
    assert.equal(
      tx.logs[0].event,
      "NewTree",
      "The NewTree event was not emitted"
    );
    assert.equal(
      tx.logs[0].args.steward,
      stewardId,
      "The steward address is incorrect"
    );
    assert.equal(
      tx.logs[0].args.proofOfPlanting,
      proofOfPlanting,
      "The proof of planting is incorrect"
    );
    assert.equal(
      tx.logs[0].args.proofOfLife,
      proofOfLife,
      "The proof of life is incorrect"
    );
    assert.equal(tx.logs[0].args.species, species, "The species is incorrect");
  });

  it("should update the proof of life of a tree", async () => {
    const proofOfPlanting =
      "0x1234000000000000000000000000000000000000000000000000000000000000";
    const newProofOfLife =
      "0x5678000000000000000000000000000000000000000000000000000000000000";
    await treeInstance.plantTree(
      proofOfPlanting,
      "0x1234000000000000000000000000000000000000000000000000000000000000",
      "12.34, 56.78",
      "Oak",
      accounts[1],
      "Zone 1",
      { from: accounts[0] }
    );
    const tx = await treeInstance.updateTreeLife(
      proofOfPlanting,
      newProofOfLife,
      { from: accounts[0] }
    );
    const treeInfo = await treeInstance.getTreeInfo(proofOfPlanting);
    assert.equal(
      treeInfo.proofOfLife,
      newProofOfLife,
      "The proof of life was not updated"
    );
  });

  it("should return the correct tree information", async () => {
    const proofOfPlanting =
      "0x1234000000000000000000000000000000000000000000000000000000000000";
    const coordinates = "12.34, 56.78";
    const species = "Oak";
    const stewardId = accounts[1];
    const parentZone = "Zone 1";
    await treeInstance.plantTree(
      proofOfPlanting,
      "0x5678000000000000000000000000000000000000000000000000000000000000",
      coordinates,
      species,
      stewardId,
      parentZone,
      { from: accounts[0] }
    );
    const treeInfo = await treeInstance.getTreeInfo(proofOfPlanting);
    assert.equal(
      treeInfo.proofOfPlanting,
      proofOfPlanting,
      "The proof of planting is incorrect"
    );
    assert.equal(
      treeInfo.coordinates,
      coordinates,
      "The coordinates are incorrect"
    );
    assert.equal(treeInfo.species, species, "The species is incorrect");
    assert.equal(treeInfo.stewardId, stewardId, "The steward ID is incorrect");
    assert.equal(
      treeInfo.parentZone,
      parentZone,
      "The parent zone is incorrect"
    );
  });
});
