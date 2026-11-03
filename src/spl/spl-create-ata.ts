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
  findAssociatedTokenPda,
  getCreateAssociatedTokenInstructionAsync,
  getMintToInstruction,
  TOKEN_PROGRAM_ADDRESS,
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

    // ATA derivation (NOT CREATION)
    // Token program property can take Token program or Token 2022 values
    const [ata] = await findAssociatedTokenPda({
      mint,
      owner: signer.address,
      tokenProgram: TOKEN_PROGRAM_ADDRESS,
    });
    console.log(`Your ata is : ${ata}`);

    if(process.env.ATA_ACCOUNT != undefined){
        throw new Error("ATA_ACCOUNT is already defined in the environment variables");
    }

    // Prepare instruction to create ATA
    const createAtaIx = await getCreateAssociatedTokenInstructionAsync({
        payer: signer,
        mint,
        owner: signer.address
    })

    const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();

    const msg = createTransactionMessage({ version: 0 });

    const msgWithPayer = setTransactionMessageFeePayerSigner(signer, msg);

    const msgWithLiftime = setTransactionMessageLifetimeUsingBlockhash(
      latestBlockhash,
      msgWithPayer,
    );

    const txMessage = appendTransactionMessageInstructions(
       [createAtaIx],
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
    process.env.ATA_ACCOUNT = ata;
  } catch (error) {
    console.log(error);
  }
})();