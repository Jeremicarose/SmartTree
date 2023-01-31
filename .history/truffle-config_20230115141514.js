const HDWalletProvider = require('@truffle/hdwallet-provider');

const mnemonic = "phrase twelve words you use to generate your accounts";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/your-project-id'),
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
