const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes, hexToBytes } = require("ethereum-cryptography/utils");

(async () => {
    const privateKey = secp.utils.randomPrivateKey();
    console.log(privateKey.constructor.name);
    console.log('private key:', toHex(privateKey));
  

   
    const publickey = secp.getPublicKey(privateKey);
    const pkey = secp.getPublicKey(hexToBytes(toHex(privateKey)));
    console.log('public key:', toHex(publickey));
    console.log('public key:', toHex(pkey));

    const hbytes = utf8ToBytes("");
    const khash = keccak256(hbytes);
    

    const sig = await secp.sign(khash, privateKey);
    const sig1 = await secp.sign(khash, privateKey, {recovered: true});
    const sig2 = await secp.sign(khash, privateKey, {recovered: false});

    let recoveryBit=1;
    const pubb = await secp.recoverPublicKey(khash, hexToBytes(toHex(sig)), recoveryBit);
    const gen_sig = secp.verify(hexToBytes(toHex(sig)), khash, hexToBytes(toHex(publickey)));

    console.log(sig);
    console.log(sig1);
    console.log(sig2);
    console.log(gen_sig);
    console.log(toHex(pubb));
    console.log(toHex(publickey));
    
    
    if (toHex(publickey)===toHex(pubb)){
        console.log('bobo');

    }



   
})();

