const sha256  =  require('sha256')

class Block {
  constructor(index, timeStamp, data, previousHash = '') {
    this.index = index;
    this.timeStamp = timeStamp;
    this.data = data;
    this.hash = this.calculateHash();
  }

  calculateHash(){
    return (sha256(this.index + this.timeStamp + JSON.stringify(this.data) + this.previousHash)).toString()
  } 
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()]
  }

  createGenesisBlock() { new Block(0, '01/01/2017', { amount: 0 }, "0") }

  getLatestBlock(){ this.chain[this.chain.length - 1]}

  addBlock (newBlock)  {
    newBlock.previousHash = this.getLatestBlock.hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock)
  }

  isChainValid() {
    for (let i = 2; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false
      }

      return true;
    }
  }
}

let myCoin = new Blockchain;
myCoin.addBlock(new Block(1, '02/01/2017', { amount: 4 }))
myCoin.addBlock(new Block(2, '03/01/2017', { amount: 5 }))
myCoin.addBlock(new Block(3, '04/01/2017', { amount: 6 }))
myCoin.addBlock(new Block(4, '04/01/2017', { amount: 6 }))
myCoin.addBlock(new Block(5, '04/01/2017', { amount: 10 }))
myCoin.addBlock(new Block(6, '04/01/2017', { amount: 20 }))
myCoin.addBlock(new Block(7, '04/01/2017', { amount: 25 }))
myCoin.addBlock(new Block(8, '04/01/2017', { amount: 39 }))
console.log(`Is MyCoin BlockChain Valid? ` + myCoin.isChainValid())

myCoin.chain[3].data = { amount: 20 };

console.log(`Is MyCoin BlockChain Valid? ` + myCoin.isChainValid()) //must return false. 
console.log(JSON.stringify(myCoin))
