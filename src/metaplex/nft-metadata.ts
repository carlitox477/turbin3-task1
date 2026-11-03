import {
  signerIdentity,
} from "@metaplex-foundation/umi";
import { getWalletAndRpcUMI } from "../helpers/getWalletAndRpcUMI";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";


const { umi, signer } = getWalletAndRpcUMI();

umi.use(
  irysUploader({
    address: "https://devnet.irys.xyz/",
  }),
);

umi.use(signerIdentity(signer));

if(process.env.IMG_URI == undefined) {
  throw new Error("IMG_URI environment variable is not set");
}

(async () => {
  try {
    //change the image uri to your image uri obtained from nft_image.ts
    const image = process.env.IMG_URI;

    //json scheme : https://www.metaplex.com/docs/smart-contracts/core/json-schema
    //change the metadata
    const metadata = {
        "name": "#2 carlitox477 NFT",
        "description": "Unique NFT by carlitox477.",
        "image": image,
        "attributes": [
            {
                "trait_type": "ManualAuditing",
                "value": "8"
            },
            {
                "trait_type": "Fuzzing",
                "value": "7"
            },
            {
                "trait_type": "AiSkills",
                "value": "7"
            }
        ],
        "properties": {
            "files": [
                {
                    "uri": image,
                    "type": "image/jpeg"
                },
            ],
            "category": "image"
        }
    }
    const myUri = await umi.uploader.uploadJson([metadata]);
    console.log(`metadata uri: ${myUri} `);
    process.env.METADATA_URI = myUri;
  } catch (error) {
    console.log("error", error);
  }
})();