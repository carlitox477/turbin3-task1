import {
  generateSigner,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { mplCore,update, fetchAsset} from "@metaplex-foundation/mpl-core";
import { base58 } from "@metaplex-foundation/umi/serializers";
import { getWalletAndRpcUMI } from "../helpers/getWalletAndRpcUMI";



const { umi, signer } = getWalletAndRpcUMI();
umi.use(signerIdentity(signer));
umi.use(mplCore());



// if(process.env.NFT_MINT_ACCOUNT != undefined) {
//    console.log(`NFT mint account already created: ${process.env.NFT_MINT_ACCOUNT}`);
// }

(async () => {
  try {
    const asset = await fetchAsset(umi, process.env.NFT_MINT_ACCOUNT_2 as string);

    //add nft name and metadata uri
    const tx = await update(
        umi,
        {
          name: "carlitox477 NFT #2",
          uri: process.env.METADATA_URI as string,
          asset: asset,
        }
    )

    const confirmedTx = await tx.sendAndConfirm(umi);

    const signature = base58.deserialize(confirmedTx.signature)[0];

    console.log(`signature ${signature} , asset : ${asset.publicKey}`);
    
  } catch (e) {
    console.log(`error ${e}`);
  }
})();