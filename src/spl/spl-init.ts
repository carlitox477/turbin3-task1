import {
  appendTransactionMessageInstructions,
  assertIsTransactionWithBlockhashLifetime,
  createTransactionMessage,
  generateKeyPairSigner,
  getSignatureFromTransaction,
  sendAndConfirmTransactionFactory,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  signTransactionMessageWithSigners,
} from "@solana/kit";
import {
  getInitializeMintInstruction,
  getMintSize,
  TOKEN_PROGRAM_ADDRESS,
} from "@solana-program/token";
import {rpc, rpcSubscriptions} from "../helpers/getRpcConnections";
import { getCreateAccountInstruction } from "@solana-program/system";
import {getWalletSigner} from "../helpers/getWallet";

if(process.env.MINT_ACCOUNT === undefined){
  (async () => {
    try{
    // Import wallet signer
    const signer = await getWalletSigner();

    // Generate mint signer
    const mintSigner = await generateKeyPairSigner();

    // Get Mint Account size
    const mintSize = BigInt(getMintSize());

    // Get laport for rent exception
    const rentExemption = await rpc.getMinimumBalanceForRentExemption(mintSize).send();

    // Fetch latest blockhash
    const {value:latestBlockhash} = await rpc.getLatestBlockhash().send();

    // Get function that sends transaction to RPC and waits for confirmation
    // Transaction contains instructions
    // Transaction are copossed by: signer, instructions, read/write accounts blockhash
    const sendAndConfirm = sendAndConfirmTransactionFactory({
      rpc,
      rpcSubscriptions
    })

    // Create empty message
    // More about tx versions: https://solana.com/es/developers/cookbook/transactions/versions
    const msg = createTransactionMessage({version:0})
    
    // Define message with fee payer
    // It will be our own account
    const msgWithPayer = setTransactionMessageFeePayerSigner(signer,msg);

    // Add blockhash to the message to set its lifetime
    const msgWithLifetime = setTransactionMessageLifetimeUsingBlockhash(
      latestBlockhash,
      msgWithPayer
    );


    const createAccountInstruction = getCreateAccountInstruction({ // Create a new account
          payer: signer, // specify the public key of the account funding the new account
          newAccount: mintSigner, // specify the public key of the new account to be created
          lamports: rentExemption, // specify lamports to sent to the new account
          space: mintSize, // specify space required for the account
          programAddress: TOKEN_PROGRAM_ADDRESS, // specify the program that will own the new account
        })
    
    const initializeMintInstruction = getInitializeMintInstruction({
          mint: mintSigner.address,
          decimals: 9,
          mintAuthority: signer.address // Establish ourselves as the mint authority
    
        })
    
    // Add instructions to message
    const txMessage = appendTransactionMessageInstructions(
      [ createAccountInstruction,initializeMintInstruction ],
      msgWithLifetime
    );

    // Sign  transaction
    const signedTx = await signTransactionMessageWithSigners(txMessage);

    // assert
    assertIsTransactionWithBlockhashLifetime(signedTx);

    const signature = getSignatureFromTransaction(signedTx);

    await sendAndConfirm(signedTx, {commitment: "confirmed"});

    console.log("Transaction confirmed with signature:", signature);
    console.log("Mint account created with address:", mintSigner.address);
    console.log("Setting MINT_ACCOUNT environment variable to:", mintSigner.address)
    process.env.MINT_ACCOUNT = mintSigner.address;

    } catch (error) {
      console.error("Error occurred:", error);
    }
  })();

}else{
  console.log("Mint account already initialized at: ", process.env.MINT_ACCOUNT)
}

