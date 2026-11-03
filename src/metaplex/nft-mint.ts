import {
  generateSigner,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { create, mplCore } from "@metaplex-foundation/mpl-core";
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
    const asset = generateSigner(umi);

    //add nft name and metadata uri
    const tx = await create(
        umi,
        {
          name: "carlitox477 NFT",
          uri: process.env.METADATA_URI as string,
          asset: asset,
        }
    )

    const confirmedTx = await tx.sendAndConfirm(umi);

    const signature = base58.deserialize(confirmedTx.signature)[0];

    console.log(`signature ${signature} , asset : ${asset.publicKey}`);
    process.env.NFT_MINT_ACCOUNT = asset.publicKey.toString();
  } catch (e) {
    console.log(`error ${e}`);
  }
})();