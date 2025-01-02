const { Secp256k1 } = require("@cosmjs/crypto");
const { DirectSecp256k1HdWallet } = require("@cosmjs/proto-signing");

async function createWallet() {
    // Generate a new HD wallet with a 24-word mnemonic
    const wallet = await DirectSecp256k1HdWallet.generate(24, { prefix: "sei" });
    
    // Get the mnemonic
    const mnemonic = wallet.mnemonic;

    // Get the first account in the wallet
    const accounts = await wallet.getAccounts();

    console.log("Mnemonic:", mnemonic);
    console.log("Address:", accounts[0]);
    return ({
        mnemonic
    })
}

createWallet().then(({mnemonic})=>{
    recoverWallet(mnemonic).then(account=>{
        console.log(account)
        // exportPrivateKey(account)
    });
});

async function recoverWallet(mnemonic) {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: "sei" });
    const accounts = await wallet.getAccounts();
    const pubkeyHex = Buffer.from(accounts[0].pubkey).toString("base64url");
    console.log("Rec address:", pubkeyHex);
    return accounts[0]
}



const { SigningStargateClient } = require("@cosmjs/stargate");

async function signAndBroadcast(wallet, rpcEndpoint, msg) {
    const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet);
    
    const [account] = await wallet.getAccounts();

    const fee = {
        amount: [{ denom: "uatom", amount: "5000" }],
        gas: "200000",
    };

    const result = await client.signAndBroadcast(account.address, [msg], fee, "Memo here");
    console.log("Broadcast result:", result);
}



