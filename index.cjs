const { Secp256k1 } = require("@cosmjs/crypto");
const { DirectSecp256k1HdWallet } = require("@cosmjs/proto-signing");

export async function createWallet() {
    // Generate a new HD wallet with a 24-word mnemonic
    const wallet = await DirectSecp256k1HdWallet.generate(24, { prefix: "sei" });
    
    // Get the mnemonic
    const mnemonic = wallet.mnemonic;

    // Get the first account in the wallet
    const accounts = await wallet.getAccounts();

    console.log("Mnemonic:", mnemonic);
    console.log("Address:", accounts[0]);
    return ({...accounts[0], mnemonic})
}





