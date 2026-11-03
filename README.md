# turbin3-task1
## SPL
1. Set env variable `DEVNET_SOLANA_PK` to private key deployer with `export $(grep -v '^#' .env | xargs)"` 
2. Run `npm run spl:init` to initialize mint account
3. Run `npm run spl:create-ata` to create  an ATA to mint authority
4. Run `npm run spl:mint` to mint 10 tokens account to mint authority ATA
5. Run `npm run spl:mint` to add metadata to mint account

## NFT
1. Set env variable `DEVNET_SOLANA_PK` to private key deployer with `export $(grep -v '^#' .env | xargs)"` 
2. Run `npm run nft:image` to upload NFT image
3. Run `npm run nft:metadata` to upload NFT metadata
4. Run `npm run nft:mint` to mint NFT


## Tasks
1. Mint and transfer your own SPL token
    1. Minting
        1. [Mint account](https://explorer.solana.com/address/GoKkz4Qtm4b5nnrYBDYzQDNSnYBiSBsSfirEubnDsqp5?cluster=devnet)
        2. [Mint account creation and initialization transaction](https://explorer.solana.com/tx/4uZTcoNPrEFPmMW1FpondszuqDrugfY58Urei2e3XkxC9mV4LxRPgdqepf2S8D3e3RVCznT3EnoLZq5N5S8ph6Lw?cluster=devnet)
        3. [ATA creation and token mint](https://explorer.solana.com/tx/2mzAXQRRtu7jsceEUaU3EEMBYysGztkHhCX1E1JW7bDKHzLfZ3rNWgNGPdGMmZn8LyNegMVKy8HjRsRKungDGWht?cluster=devnet)
        4. [ATA](https://explorer.solana.com/address/2mqtNpct6bEctwHyVXz34sXppPrXo3eCU6XBLJbgJuTo?cluster=devnet) 
    2. [Token transfer](https://solscan.io/tx/44gmwmmFqSsdrdU4gLa7Dd4fycBowjx2zXBtyLoRFWNVrDyVU941hLsuEa2nK48QRwR5336HsJ8PuF5WJifWasj9?cluster=devnet)
2. Mint an NFT using MPL Core.
3. Update the NFT's name and metadata as the update authority

## 
```bash
MINT_ACCOUNT="GoKkz4Qtm4b5nnrYBDYzQDNSnYBiSBsSfirEubnDsqp5"
ATA_ACCOUNT="2mqtNpct6bEctwHyVXz34sXppPrXo3eCU6XBLJbgJuTo"
NFT_IMG="/workspaces/turbin3-task1/img/carlitox-nft.jpg"
IMG_URI="https://gateway.irys.xyz/5A23nMYSdpnb72Td1DU6fiv8tNvL35dtrRRZdNo572dA"
NFT_MINT_ACCOUNT="CojmKkqNzqAnnBCGCmXFrgkmSbdY6LqHi7fuDMHLgZPZ"
METADATA_URI="https://gateway.irys.xyz/i4vgfnhmEWy9dUd2BxPK9Fcf4uoca9dSJXPLraDmr6J"
```

