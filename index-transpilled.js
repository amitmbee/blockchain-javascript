'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sha256 = require('sha256');

var Block = function () {
  function Block(index, timeStamp, data) {
    var previousHash = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

    _classCallCheck(this, Block);

    this.index = index;
    this.timeStamp = timeStamp;
    this.data = data;
    this.hash = this.calculateHash();
  }

  _createClass(Block, [{
    key: 'calculateHash',
    value: function calculateHash() {
      return sha256(this.index + this.timeStamp + JSON.stringify(this.data) + this.previousHash).toString();
    }
  }]);

  return Block;
}();

var Blockchain = function () {
  function Blockchain() {
    _classCallCheck(this, Blockchain);

    this.chain = [this.createGenesisBlock()];
  }

  _createClass(Blockchain, [{
    key: 'createGenesisBlock',
    value: function createGenesisBlock() {
      new Block(0, '01/01/2017', { amount: 0 }, "0");
    }
  }, {
    key: 'getLatestBlock',
    value: function getLatestBlock() {
      this.chain[this.chain.length - 1];
    }
  }, {
    key: 'addBlock',
    value: function addBlock(newBlock) {
      newBlock.previousHash = this.getLatestBlock.hash;
      newBlock.hash = newBlock.calculateHash();
      this.chain.push(newBlock);
    }
  }, {
    key: 'isChainValid',
    value: function isChainValid() {
      for (var i = 2; i < this.chain.length; i++) {
        var currentBlock = this.chain[i];
        var previousBlock = this.chain[i - 1];

        if (currentBlock.hash !== currentBlock.calculateHash()) {
          return false;
        }

        if (currentBlock.previousHash !== previousBlock.hash) {
          return false;
        }

        return true;
      }
    }
  }]);

  return Blockchain;
}();

var myCoin = new Blockchain();
myCoin.addBlock(new Block(1, '02/01/2017', { amount: 4 }));
myCoin.addBlock(new Block(2, '03/01/2017', { amount: 5 }));
myCoin.addBlock(new Block(3, '04/01/2017', { amount: 6 }));
myCoin.addBlock(new Block(4, '04/01/2017', { amount: 6 }));
myCoin.addBlock(new Block(5, '04/01/2017', { amount: 10 }));
myCoin.addBlock(new Block(6, '04/01/2017', { amount: 20 }));
myCoin.addBlock(new Block(7, '04/01/2017', { amount: 25 }));
myCoin.addBlock(new Block(8, '04/01/2017', { amount: 39 }));
console.log('Is MyCoin BlockChain Valid? ' + myCoin.isChainValid());

myCoin.chain[3].data = { amount: 20 };

console.log('Is MyCoin BlockChain Valid? ' + myCoin.isChainValid()); //must return false. 
console.log(JSON.stringify(myCoin));
