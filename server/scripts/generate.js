const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes, hexToBytes } = require("ethereum-cryptography/utils");
//const { utf8ToBytes } = require("ethereum-cryptography/utils");
//const privateKey = secp.utils.randomPrivateKey();
//console.log('private key:', toHex(privateKey));
//const publickey = secp.getPublicKey(privateKey);
//console.log('public key:', toHex(publickey));
//const hbytes = utf8ToBytes("");
//const khash = keccak256(hbytes);
//const sig = secp.sign(khash,privateKey,{recovered:true}); 
//console.log('sig:', sig);

(async () => {
    const privateKey = secp.utils.randomPrivateKey();
    console.log(privateKey.constructor.name);
    console.log('private key:', toHex(privateKey));
   // console.log('private key:', privateKey);
  //  console.log('private key:', toString(privateKey));
 //   console.log('private key:', utf8ToBytes(toHex(privateKey)));

   // console.log(typeof(toHex(privateKey)));
    const publickey = secp.getPublicKey(privateKey);
    const pkey = secp.getPublicKey(utf8ToBytes(toHex(privateKey)));
    console.log('public key:', toHex(publickey));
    console.log('public key:', toHex(pkey));

   // console.log('public key:', toHex(publickey));
    const hbytes = utf8ToBytes("");
    const khash = keccak256(hbytes);
    console.log(typeof(khash));
    //const [sig, recoveryBit] = await secp.sign(khash, privateKey, {recovered: true});
    const sig = await secp.sign(khash, privateKey);
    console.log('sig:', toHex(sig));
    console.log(typeof(sig));
    console.log(sig);    
    //console.log('rec:', recoveryBit);
    //const pubb = await secp.recoverPublicKey(khash, sig, 1);
    console.log('Publi:', toHex(pubb));


    console.log('Test data')
    console.log('private key:', toHex(privateKey));
    console.log('public key:', toHex(publickey));
    console.log('sig:', toHex(sig));
    
    const sigBytes = hexToBytes(toHex(sig));
    console.log('Signature length in bytes:', sigBytes.length);


})();


//version 2.0 for ethereum cryptography
//const privateKey = secp.secp256k1.utils.randomPrivateKey();


//const publickey = secp.secp256k1.getPublicKey(privateKey);
//console.log('public key:', toHex(publickey));

//const hbytes = utf8ToBytes("");
//const khash = keccak256(hbytes);
//const signature = secp.secp256k1.sign(khash,privateKey);
//console.log(signature);
//const pubb = signature.recoverPublicKey(khash).toHex();
//console.log('haa');
//console.log(pubb);///