const assert = require('assert');
const IPFS = require('ipfs');

describe('IPFS', function() {
    it('Should connect to remote IPFS node using Infura', function(done) {
        const ipfs = new IPFS({
            repo: 'ipfs-' + Math.random(),
            config: {
                Addresses: {
                    Swarm: [
                        '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
                    ]
                }
            },
            EXPERIMENTAL: {
                pubsub: true
            },
            relay: {
                enabled: true,
                hop: {
                    enabled: true
                }
            },
            preload: {
                enabled: true
            },
            swarm: {
                dialer: {
                    maxParallelDials: 150,
                    maxDiscoveryQueueSize: 1000
                }
            }
        });
        ipfs.on('ready', () => {
            assert.ok(ipfs.isOnline());
            done();
        });
    });
});
