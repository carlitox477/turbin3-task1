import {
  createSignerFromKeypair,
  publicKey,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { base58 } from '@metaplex-foundation/umi/serializers';
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createMetadataAccountV3,
  CreateMetadataAccountV3InstructionAccounts,
  CreateMetadataAccountV3InstructionArgs,
  DataV2Args,
} from "@metaplex-foundation/mpl-token-metadata";
import {getWalletAndRpcUMI} from "../helpers/getWalletAndRpcUMI";


const { umi, signer } = getWalletAndRpcUMI();
umi.use(signerIdentity(signer));


if(process.env.MINT_ACCOUNT == undefined){
  throw new Error("MINT_ACCOUNT is not defined in the environment variables, run 'npm run spl:init first'");
}
const mint = publicKey(process.env.MINT_ACCOUNT);


(async () => {
  try {
    const accounts: CreateMetadataAccountV3InstructionAccounts = {
      mint,
      mintAuthority: signer,
    };

    //Create token metadata
    const data: DataV2Args ={
        name: "carlitox477",
        symbol: "C477",
        uri: "https://x.com/carlitox477",
        sellerFeeBasisPoints: 0,
        creators: null,
        collection: null,
        uses: null
    }

    const args: CreateMetadataAccountV3InstructionArgs = {
        data,
        isMutable: true,
        collectionDetails: null
    }

    const tx = createMetadataAccountV3(umi, {
       ...accounts,
       ...args,
    });

    const result = await tx.sendAndConfirm(umi);
    console.log("signature: ", base58.deserialize(result.signature));
  } catch (error) {
    console.log("error", error);
  }
})();
