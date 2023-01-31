const HDWalletProvider = require('@truffle/hdwallet-provider');

const mnemonic = "fork that you chapter front track inspire lunch custom dismiss fold taxi";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777"
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, 'https://celo-alfajores.infura.io/v3/16eee3c4d10c4b3a9ff3f8c8163eedb5'),
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
};
