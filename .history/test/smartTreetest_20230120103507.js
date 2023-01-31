const Tree = artifacts.require("Tree");

contract("Tree", (accounts) => {
  let treeInstance;

  before(async () => {
    treeInstance = await Tree.new({from: accounts[0]});
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
    const tx = await treeInstance.
