import {
  createGenericFile,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { readFile } from "fs/promises";
import { getWalletAndRpcUMI } from "../helpers/getWalletAndRpcUMI";

const { umi, signer } = getWalletAndRpcUMI();

umi.use(
  irysUploader({
    address: "https://devnet.irys.xyz/",
  }),
);

umi.use(signerIdentity(signer));

(async () => {
  try {
    //chanege image path to your image path
    if(process.env.NFT_IMG == undefined){
      throw new Error("NFT_IMG is not defined in the environment variables");
    }

    const image = await readFile(process.env.NFT_IMG);

    //change the image name and mime type
    const file = createGenericFile(image, "carlitox-nft.jpg", {
      contentType: "image/jpeg",
    });

    const [myUri] = await umi.uploader.upload([file]);
    console.log("Your image URI: ", myUri);
    process.env.NFT_URI = myUri;
  } catch (error) {
    console.log(error);
  }
})();
