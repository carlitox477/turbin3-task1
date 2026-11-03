import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { createSignerFromKeypair } from "@metaplex-foundation/umi";
import { base58 } from '@metaplex-foundation/umi/serializers';


const getWalletAndRpcUMI = () => {
  const umi = createUmi("https://api.devnet.solana.com");

  if(process.env.DEVNET_SOLANA_PK == undefined){
    throw new Error("DEVNET_SOLANA_PK is not defined in the environment variables");
  }

  const secretKey = base58.serialize(process.env.DEVNET_SOLANA_PK);
  const keypair = umi.eddsa.createKeypairFromSecretKey(secretKey);
  const signer = createSignerFromKeypair(umi, keypair);

  return { umi, signer };
};

export { getWalletAndRpcUMI };