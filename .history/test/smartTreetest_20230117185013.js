const Tree = artifacts.require("Tree");

contract("Tree", accounts => {
    let treeInstance;

    before(async () => {
        treeInstance = await Tree.new();
    });

    it("should plant a tree", async () => {
        const proofOfPlanting = "0x1234";
        const proofOfLife = "0x5678";
        const coordinates = "12.34, 56.78";
        const species = "Oak";
        const stewardId = accounts[1];
        const parentZone = "Zone 1";
        const tx = await tree.plantTree(proofOfPlanting, proofOfLife, coordinates, species, stewardId, parentZone);
        assert.equal(tx.logs[0].event, "NewTree", "The NewTree event was not emitted");
        assert.equal(tx.logs[0].args.steward, stewardId, "The steward address is incorrect");
        assert.equal(tx.logs[0].args.proofOfPlanting, proofOfPlanting, "The proof of planting is incorrect");
        assert.equal(tx.logs[0].args.proofOfLife, proofOfLife, "The proof of life is incorrect");
        assert.equal(tx.logs[0].args.species, species, "The species is incorrect");
    });
    it("should update the proof of life of a tree", async () => {
        const proofOfPlanting = "0x1234";
        const newProofOfLife = "0x5678";
        await tree.plantTree(proofOfPlanting, "0x0000", "12.34, 56.78", "Oak", accounts[1], "Zone 1");
        const tx = await tree.updateTreeLife(proofOfPlanting, newProofOfLife);
        const treeInfo = await tree.getTreeInfo(proofOfPlanting);
        assert.equal(treeInfo.proofOfLife, newProofOfLife, "The proof of life was not updated");
    });

    it("should return the correct tree information", async () => {
        const proofOfPlanting = "0x1234";
        const coordinates = "12.34, 56.78";
        const species = "Oak";
        const stewardId = accounts[1];
        const parentZone = "Zone 1";
        await tree.plantTree(proofOfPlanting, "0x5678", coordinates, species, stewardId, parentZone);
        const treeInfo = await tree.getTreeInfo(proofOfPlanting);
        assert.equal(treeInfo.proofOfPlanting, proofOfPlanting, "The proof of planting is incorrect");
        assert.equal(treeInfo.coordinates, coordinates, "The coordinates are incorrect");
        assert.equal(treeInfo.species, species, "The species is incorrect");
        assert.equal(treeInfo.stewardId, stewardId, "The steward ID is incorrect");
        assert.equal(treeInfo.parentZone, parentZone, "The parent zone is incorrect");
    });

    it("should change ownership of the contract", async () => {
        const newOwner = accounts[2];
        const tx = await tree.changeOwnership(newOwner);
        assert.equal(tx.logs[0].event, "OwnershipTransferred", "The OwnershipTransferred event was not emitted");
        assert.equal(tx.logs[0].args.previousOwner, accounts[0], "The previous owner is incorrect");
        assert.equal(tx.logs[0].args.newOwner, newOwner, "The new owner is incorrect");
    });

    it("should renounce ownership of the contract", async () => {
        const tx = await tree.renounceOwnership();
        assert.equal(tx.logs[0].event, "OwnershipRenounced", "The OwnershipRenounced event was not emitted");
        assert.equal(tx.logs[0].args.previousOwner, accounts[0], "The previous owner is incorrect");
    });
});
