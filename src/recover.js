const caver = require('caver-js');
const Bytes = require('eth-lib/lib/Bytes');
const elliptic = require("elliptic");
const secp256k1 = new elliptic.ec("secp256k1");
const { keccak256, keccak256s } = require("eth-lib/lib/hash");

export function recover(message) {
    const hex = message.signature
    const hash = message.message
    const vals = [Bytes.slice(64, Bytes.length(hex), hex), Bytes.slice(0, 32, hex), Bytes.slice(32, 64, hex)];

    const vrs = { v: Bytes.toNumber(vals[0]), r: vals[1].slice(2), s: vals[2].slice(2) };

    const ecPublicKey = secp256k1.recoverPubKey(new Buffer(hash.slice(2), "hex"), vrs, vrs.v < 2 ? vrs.v : 1 - vrs.v % 2); // because odd vals mean v=0... sadly that means v=0 means v=1... I hate that
    const publicKey = "0x" + ecPublicKey.encode("hex", false).slice(2);
    const publicHash = keccak256(publicKey);

    const recoveredAddress = "0x" + publicHash.slice(-40);

    if (recoveredAddress.toLowerCase() === message.address.toLowerCase()) {
         console.log("ok", recoveredAddress, message.address)
         return true
    } else {
         console.log("not match", recoveredAddress, message.address)
    }
    return false
}