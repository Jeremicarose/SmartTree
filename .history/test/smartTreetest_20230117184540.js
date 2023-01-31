const Tree = artifacts.require("Tree");

contract("Tree", accounts => {
    let treeInstance;

    before(async () => {
        tree = await Tree.deployed();
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
