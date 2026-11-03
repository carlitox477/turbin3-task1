import {
  address,
  appendTransactionMessageInstructions,
  assertIsTransactionWithBlockhashLifetime,
  createTransactionMessage,
  getSignatureFromTransaction,
  sendAndConfirmTransactionFactory,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  signTransactionMessageWithSigners,
} from "@solana/kit";
import {rpc, rpcSubscriptions} from "../helpers/getRpcConnections";
import {getWalletSigner} from "../helpers/getWallet";

import {
  getMintToInstruction,
} from "@solana-program/token";



const token_decimals = 1_000_000_000n;

//paste your mint address got from spl_init.ts
if(process.env.MINT_ACCOUNT === undefined){
  throw new Error("MINT_ACCOUNT is not defined in the environment variables, run 'npm run spl:init first'");
}

const mint = address(process.env.MINT_ACCOUNT);

(async () => {
  try {
    const signer = await getWalletSigner()

    if(process.env.ATA_ACCOUNT == undefined){
        throw new Error("ATA_ACCOUNT is not defined in the environment variables");
    }

 
    const mintToIx = getMintToInstruction({
        mint, // Because its supply will be affected
        token: address(process.env.ATA_ACCOUNT), // Bad property name | its storage will be modified
        mintAuthority: signer, // Its signature will be required
        amount: 10n * token_decimals
    })

    const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();

    const msg = createTransactionMessage({ version: 0 });

    const msgWithPayer = setTransactionMessageFeePayerSigner(signer, msg);

    const msgWithLiftime = setTransactionMessageLifetimeUsingBlockhash(
      latestBlockhash,
      msgWithPayer,
    );

    const txMessage = appendTransactionMessageInstructions(
       [mintToIx],
       msgWithLiftime,
    );

    const signedTx = await signTransactionMessageWithSigners(txMessage);

    assertIsTransactionWithBlockhashLifetime(signedTx);

    const signature = getSignatureFromTransaction(signedTx);

    const sendAndConfirm = sendAndConfirmTransactionFactory({
       rpc,
       rpcSubscriptions,
    });

    await sendAndConfirm(signedTx, { commitment: "confirmed" });

    console.log(`mint txid: ${signature}`);
    
  } catch (error) {
    console.log(error);
  }
})();