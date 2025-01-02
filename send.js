const { SigningStargateClient,  GasPrice } = require('@cosmjs/stargate');
const { DirectSecp256k1HdWallet } = require('@cosmjs/proto-signing');

async function main() {
  const rpcEndpoint = "https://rpc.sei-apis.com/"; // Replace with the actual RPC endpoint.
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
    "real list hungry matrix boring maze lucky stick dinosaur casual catch affair minute assault enhance broccoli guilt choice wife tornado copy note order twist", // Replace with your wallet mnemonic.
    { prefix: "sei" }
  );

  const [firstAccount] = await wallet.getAccounts();
  console.log("Account address:", firstAccount.address);

  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet, {
    gasPrice: GasPrice.fromString("0.025usei")
  });
  const recipientAddress = "sei1zjxfju4vjwu3gx5famk57njx52wtc056se6xsh"; // Replace with the recipient's address.
  const amount = [
    {
      denom: "usei", // Replace with the correct denom.
      amount: "1000000", // Amount to transfer in micro units.
    },
  ];

  const result = await client.sendTokens(firstAccount.address, recipientAddress, amount, "auto");
//   assertIsBroadcastTxSuccess(result);

  console.log("Tokens transferred successfully!", result);
}

main().catch(console.error);
