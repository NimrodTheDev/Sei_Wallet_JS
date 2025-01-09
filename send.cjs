const { SigningStargateClient,  GasPrice, StargateClient } = require('@cosmjs/stargate');
const { DirectSecp256k1HdWallet } = require('@cosmjs/proto-signing');

async function sendSei(mnemonic, receiver, coin_amount) {
  const rpcEndpoint = "https://rpc.sei-apis.com/"; // Replace with the actual RPC endpoint.
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
    mnemonic,
    { prefix: "sei" }
  );

  const [firstAccount] = await wallet.getAccounts();
  console.log("Account address:", firstAccount.address);
  
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet, {
    gasPrice: GasPrice.fromString("0.025usei")
  });
  const recipientAddress = receiver; // Replace with the recipient's address.
  const amount = [
    {
      denom: "usei", // Replace with the correct denom.
      amount: coin_amount, // Amount to transfer in micro units.
    },
  ];
  const result = await client.sendTokens(firstAccount.address, recipientAddress, amount, "auto");
//   assertIsBroadcastTxSuccess(result);

  return(result);
}

async function getBalance(address){
  const rpcEndpoint = "https://rpc.sei-apis.com/"; 
  
  try {
    const client = await StargateClient.connect(rpcEndpoint)
    let coins = await client.getAllBalances(address)
    let data = ''
    if (coins.length === 0) {
      data = "Wallet is currently empty ;-;) Fund wallet"
    }else{
      coins.forEach((value)=>{
        console.log(value)
        data+=`- ${value.denom}: ${value.amount} \n`
      })
      data+=`This is your balance in the unit used by the blockchain which is amount*1000000, please divide it by 1000000 to get amount in sei`
    }
    return data
  } catch (error) {
    return error.message
  }
  // console.log('reached 1')
  
  // console.log('reached 2')
  
}
// main().catch(console.error);

module.exports = {getBalance, sendSei}