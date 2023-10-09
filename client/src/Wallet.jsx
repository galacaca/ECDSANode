import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1"
import { toHex } from "ethereum-cryptography/utils";
import { utf8ToBytes, hexToBytes } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";



function Wallet({ address, setAddress, balance, setBalance, privateKey,setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    console.log('PrivateKey:', privateKey);
    setPrivateKey(privateKey);
    

    //const address = toHex(secp.getPublicKey(privateKey));
    const recoveryBit = 1;
    const hbytes = utf8ToBytes("");
    const khash = keccak256(hbytes);

    //const sigBytes = hexToBytes(sig);
    //console.log('Signature length in bytes:', sigBytes.length);

    //const address = await toHex(secp.recoverPublicKey(khash, hexToBytes(sig), recoveryBit));
    //const address = await (secp.recoverPublicKey(khash, sig, recoveryBit));
    const address = toHex(secp.getPublicKey(privateKey));

   setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        PrivateKey
        <input placeholder="Private Key" value={privateKey} onChange={onChange}></input>
      </label>


      <div> Address: {address}</div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
