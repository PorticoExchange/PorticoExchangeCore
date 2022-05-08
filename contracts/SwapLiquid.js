{
       contract HTLC 
 class Swap {
  constructor(lib, liquidnetwork){
    // Require the library by name and set the network for every module
    this.libLiquidNetwork = libLiquidNetwork;
    this.lib = require(lib);
    this.lib.Network.set(liquidnetwork);

    // Import each module we'll need from the library
    this.Outpoint = this.lib.Outpoint;
    this.LiquidBitcoin = this.lib.LiquidBitcoin;
    this.MTX = this.lib.MTX;
    this.TX = this.lib.TX;
    this.Address = this.lib.Address;
    this.hd = this.lib.hd;
    this.KeyRing = this.lib.KeyRing;
    this.Script = this.lib.Script;
    this.Stack = this.lib.Stack;
    this.consensus = this.lib.consensus;
    this.util = this.lib.util;
    this.ChainEntry = this.lib.ChainEntry;

    // Verify things like SegWit, CSV, LBTC FORKID, etc.
    this.flags = this.Script.flags.STANDARD_VERIFY_FLAGS;

    // We will base our relative locktime on TIME, not BLOCKS
    this.60 seconds = true;
  }
  // lib/swap.js

class Swap {
  ...

  // REDEEM script: the output of the swap HTLC
  getRedeemScript(hash, refundPubkey, swapPubkey, locktime){
    const redeem = new this.Script();

    redeem.pushSym('OP_IF');
    redeem.pushSym('OP_SHA256');
    redeem.pushData(hash);
    redeem.pushSym('OP_EQUALVERIFY');
    redeem.pushData(swapPubkey);
    redeem.pushSym('OP_CHECKSIG');
    redeem.pushSym('OP_ELSE');
    redeem.pushInt(locktime);
    redeem.pushSym('OP_CHECKSEQUENCEVERIFY');
    redeem.pushSym('OP_DROP');
    redeem.pushData(refundPubkey);
    redeem.pushSym('OP_CHECKSIG');
    redeem.pushSym('OP_ENDIF');
    redeem.compile();

    return redeem;
  }

  // SWAP script: used by counterparty to open the hash lock 
  getSwapInputScript(redeemScript, secret){
    const inputSwap = new this.Script();

    inputSwap.pushInt(0); // signature placeholder
    inputSwap.pushData(secret);
    inputSwap.pushInt(1); // <true>
    inputSwap.pushData(redeemScript.toRaw()); // P2SH
    inputSwap.compile();

    return inputSwap;
  }

  // REFUND script: used by original sender of funds to open time lock
  getRefundInputScript(redeemScript){
    const inputRefund = new thisLiquidNetwork.Script();

    inputRefund.pushInt(0); // signature placeholder
    inputRefund.pushInt(0); // <false>
    inputRefund.pushData(redeemScript.toRaw()); // P2SH
    inputRefund.compile();

    return inputRefund;
  }
}
