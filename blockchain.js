// node blockchain.js

const SHA256 = require('crypto-js/sha256');
class Block {
    constructor(index, data, previousHash = null, timestamp = this.getDateTime()) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    getDateTime = () => {
        let today = new Date();
        let date = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
        let time = `${today.getHours()}:${today.getMinutes() + 1}:${today.getSeconds()}`;
        let dateTime = date + ' ' + time;
        return dateTime;
    }

    calculateHash = () => {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}



class Blockchain {
    constructor() {
        this.blockchain = [this.createGenesisBlock()];
    }

    createGenesisBlock = () => {
        return new Block(0, "Genesis Block");
    }

    getLatestBlock = () => {
        return this.blockchain[this.blockchain.length - 1];
    }

    addBlock = (newBlock) => {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.blockchain.push(newBlock)
    }

    isBlockchainValid = () => {
        for (let i = 1; i < this.blockchain.length; i++) {
            const currentBlock = this.blockchain[i];
            const previousBlock = this.blockchain[i - 1];

            if ((currentBlock.hash !== currentBlock.calculateHash()) || (currentBlock.previousHash !== previousBlock.hash))
                return false;
        }
        return true;
    }

}


let blockCoin = new Blockchain();
blockCoin.addBlock(new Block(1, { amount: 50 }))
blockCoin.addBlock(new Block(2, { amount: 100 }))
blockCoin.addBlock(new Block(3, { amount: 150 }))

console.log(JSON.stringify(blockCoin, null, 5))
console.log("\nIs Blockchain Valid ? ", blockCoin.isBlockchainValid());

// Now Let's try to overring the data and see if our blockchain is still valid ?

// blockCoin.blockchain[2].data = { amount: 1000 };
// console.log(JSON.stringify(blockCoin, null, 5))
// console.log("\nIs Blockchain Valid ? ", blockCoin.isBlockchainValid());


// blockCoin.blockchain[2].data = { amount: 1000 };
// blockCoin.blockchain[2].hash = blockCoin.blockchain[2].calculateHash();
// console.log(JSON.stringify(blockCoin, null, 5))
// console.log("\nIs Blockchain Valid ? ", blockCoin.isBlockchainValid());