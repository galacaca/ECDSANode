const express = require("express");
const secp = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes, hexToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "042a77a18bfb27ad7697b3fa1398cbe6c500aeb7510c4d8e197272829244592061b58bd6033fae388847e70f9bdceb5a565acc8d2a8d70936f216869a1558bfae6": 100,
  "04e5c18e95f93b54b43d277566216a6d7a5e8b2396b4fb7eba9c34b06aab1096d0f2f131dab207c8ba35ddb903a21b956b7baa5c0c93d27a0e135ca6c18c30988d": 50,
  "04934d3139d31dc6f215b10d6545edcf5179d7a7d8cf1ae6fc8e2261b73997384df415ceae6b4fff4d0b6dfbefdebd5c31d0aff412cf55375452d5643a8a691013": 75,
};

//Public
//042a77a18bfb27ad7697b3fa1398cbe6c500aeb7510c4d8e197272829244592061b58bd6033fae388847e70f9bdceb5a565acc8d2a8d70936f216869a1558bfae6
// Private
//56bb0a0f2f2cd9206150cf38e46f9a49f731a45bbbde514ef3b8bb104fdc0c85


//Public
//04e5c18e95f93b54b43d277566216a6d7a5e8b2396b4fb7eba9c34b06aab1096d0f2f131dab207c8ba35ddb903a21b956b7baa5c0c93d27a0e135ca6c18c30988d
// Private
//78236aa4d475fa0275ff0aeb2c03a2ae304fd1630159f99350ab790cc72e9f1f


//Public
//04934d3139d31dc6f215b10d6545edcf5179d7a7d8cf1ae6fc8e2261b73997384df415ceae6b4fff4d0b6dfbefdebd5c31d0aff412cf55375452d5643a8a691013
// Private
//5bbd906f8f0716425a4a13e9a827a3a9326c327a307fa26ac04757cb3671fb62


app.get("/balance/:address", async (req, res) => {
  const { address } = req.params;
  console.log(address.constructor.name);
  console.log(address);
  //unit_address = hexToBytes(address);

  const balance = balances[address] || 0;
  console.log("Request Body:", req.body);

  res.send({ balance });
});

app.post("/send", async (req, res) => { // <- Corrected 'sync' to 'async'
  const { sender, recipient, amount, sig } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  const hbytes = utf8ToBytes("");
  const khash = keccak256(hbytes);
  const recoveryBit = 1;
  const pubb = await secp.recoverPublicKey(khash, hexToBytes(sig), recoveryBit);
  console.log('Publi:', toHex(pubb));

  const gen_sig = secp.verify(hexToBytes(sig), khash, hexToBytes(sender));

  if (toHex(pubb) !== sender) {  // <- Changed `toString()` to `toHex()`
    res.status(400).send({ message: "Fake Sender" });
  }
  else if (!gen_sig) {
    res.status(400).send({ message: "Fake Sig" });
  }
  else if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}