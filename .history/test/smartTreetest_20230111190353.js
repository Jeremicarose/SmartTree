const Tree = artifacts.require("Tree");

contract("Tree", accounts => {
    let treeInstance;

    before(async () => {
        treeInstance = await Tree.new();
    });

    it("should plant a tree", async () => {
        const proofOfPlanting = "0x7f6f787075726c797572650000000000000001";
        const proofOfLife = "0x7f6f787075726c797572650000000000000002";
        const coordinates = "12.34567, -98.76543";
        const species = "Oak";
        const steward = accounts[1];
        const parentZone = "parks";

        await treeInstance.plantTree(proofOfPlanting, proofOfLife, coordinates, species, steward, parentZone);

        const treeInfo = await treeInstance.getTreeInfo(proofOfPlanting);

        assert.equal(treeInfo.proofOfPlanting, proofOfPlanting, "proof of planting is not correct");
        assert.equal(treeInfo.proofOfLife, proofOfLife, "proof of life is not correct");
        assert.equal(treeInfo.coordinates, coordinates, "coordinates are not correct");
        assert.equal(treeInfo.species, species, "species is not correct");
        assert.equal(treeInfo.stewardId, steward, "steward is not correct");
        assert.equal(treeInfo.parentZone, parentZone, "parent zone is not correct");
    });
});
