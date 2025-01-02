const { DirectSecp256k1HdWallet } = require("@cosmjs/proto-signing");
const { SigningStargateClient } = require("@cosmjs/stargate");

async function run() {
    // Step 1: Define mnemonic and RPC endpoint
    const mnemonic = "pistol remember timber series glue sport earth file love mouse solve board";
    const rpcEndpoint = "https://rpc.cosmos.network:443"; // Replace with your blockchain's RPC endpoint

    // Step 2: Create wallet from mnemonic
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: "sei" });

    // Step 3: Extract account info and private key
    const [account] = await wallet.getAccounts();
    console.log("Address:", account.address);

    // NOTE: DirectSecp256k1HdWallet does not expose private keys directly,
    // as it's designed for secure key management.

    // Step 4: Define a transaction message (example: sending tokens)
    const sendMsg = {
        typeUrl: "/cosmos.bank.v1beta1.MsgSend",
        value: {
            fromAddress: account.address,
            toAddress: "cosmos1exampleaddresshere", // Replace with recipient address
            amount: [{ denom: "uatom", amount: "100000" }], // Sending 100,000 uatom
        },
    };

    // Step 5: Set up transaction fee
    const fee = {
        amount: [{ denom: "uatom", amount: "5000" }], // Fee amount
        gas: "200000", // Gas limit
    };

    // Step 6: Sign and broadcast transaction
    const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet);
    const result = await client.signAndBroadcast(account.address, [sendMsg], fee, "Memo here");

    console.log("Transaction result:", result);
}

run().catch(console.error);
