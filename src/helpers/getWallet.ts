import { createKeyPairSignerFromBytes } from "@solana/kit";
import bs58 from "bs58";

async function getWalletSigner() {
  const privateKey = process.env.DEVNET_SOLANA_PK;

  if (!privateKey) {
    throw new Error("DEVNET_SOLANA_PK is not set");
  }

  // Decode the base58-encoded secret key.
  const secretKey = bs58.decode(privateKey);

  // Standard Solana secret keys contain 64 bytes.
  if (secretKey.length !== 64) {
    throw new Error(
      `Expected a 64-byte secret key, received ${secretKey.length} bytes`
    );
  }

  // Create a Kit-compatible signer.
  const signer = await createKeyPairSignerFromBytes(secretKey);

  console.log("Wallet address:", signer.address);

  return signer;
}

// getWalletSigner().catch(console.error);

export { getWalletSigner };