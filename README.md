# Turbin3 - Task 1
Repository solving task 1 from Turbin3 Cohort 2026 Q4.

To run the scripts, we must set the `DEVNET_SOLANA_PK` environment variable in the `.env` file to the deployer's private key using `export $(grep -v '^#' .env | xargs)"`.

## Tasks
1. Mint and transfer your own SPL token
    1. Minting
        1. [Mint account](https://explorer.solana.com/address/GoKkz4Qtm4b5nnrYBDYzQDNSnYBiSBsSfirEubnDsqp5?cluster=devnet)
        2. [Mint account creation and initialization transaction](https://explorer.solana.com/tx/4uZTcoNPrEFPmMW1FpondszuqDrugfY58Urei2e3XkxC9mV4LxRPgdqepf2S8D3e3RVCznT3EnoLZq5N5S8ph6Lw?cluster=devnet)
        3. [ATA creation and token mint](https://explorer.solana.com/tx/2mzAXQRRtu7jsceEUaU3EEMBYysGztkHhCX1E1JW7bDKHzLfZ3rNWgNGPdGMmZn8LyNegMVKy8HjRsRKungDGWht?cluster=devnet)
        4. [ATA](https://explorer.solana.com/address/2mqtNpct6bEctwHyVXz34sXppPrXo3eCU6XBLJbgJuTo?cluster=devnet) 
    2. [Token transfer](https://solscan.io/tx/44gmwmmFqSsdrdU4gLa7Dd4fycBowjx2zXBtyLoRFWNVrDyVU941hLsuEa2nK48QRwR5336HsJ8PuF5WJifWasj9?cluster=devnet)
2. Mint an NFT using MPL Core.
    1. [NFT account](https://explorer.solana.com/address/6KJfGGPw6tWws6JQ6pG1dbwTTQkWJqtSVQD1ySQtgg3W?cluster=devnet)
    2. [NFT mint transaction](http://explorer.solana.com/tx/Z1koZHmhYNZjBZutcDnhbJmZPFGP8TTz4aX9HZivdEQT7GgJ7ZW16dJuNZ9KMhykExJegn58mE9oQqiMZ4zsavf?cluster=devnet)
3. Update the NFT's name and metadata as the update authority
    1. [2° NFT minted](https://explorer.solana.com/address/4UEcuGwqMHg7AH2rXzF8rnRR5WEFBm8RgLthQLJBxqBt?cluster=devnet)
    2. [2° NFT mint transaction](https://explorer.solana.com/tx/3EEAy8JN99mS1vPPcn9KQz3yoXqFdxFte3Xqt4uT5U8weKUiRLBeJVxarPPhg8sAT17nxVhKBd4oyycaWvXALYWB?cluster=devnet)
    3. [2° NFT update transaction](https://explorer.solana.com/tx/3nh75snS6B4RHP6GV8dbT7a9ozdHCaHxZXJu2N47aB8tvZ1s4xv2XqtqEjyGtiWRrmEmURkB5JRirt2scPQCuSwP?cluster=devnet)

Optional:
1. Transfer the NFT ownership between wallets: [Transfer transaction](https://explorer.solana.com/tx/3PgryCa7iKsJKw1V23rq7JYctQ8mu2gHxeCkzMy6sYjSbq76W98qNxwU3SLBty6QATuknD2TuvQZ2caVN85sH8HH?cluster=devnet)
2. Permanently destroy the NFT and reclaim the rent fees: [Burn transaction](https://explorer.solana.com/tx/4ck75DNDL5rzEjwvDKxvJMtebs7qkahNPzWKqDRd7gAzSu39tYb4CgJRLe1EK9dPuUd4gEoJMTp6RPnunvyZtd6b?cluster=devnet)


## SPL scripts
| Command                  | Description                                         |
|--------------------------|-----------------------------------------------------|
| `npm run spl:init`       | Initialize a mint account through SPL Token Program |
| `npm run spl:create-ata` | Creates an ATA to mint authority                    |
| `npm run spl:mint`       | Mints 10 tokens to mint authority ATA               |
| `npm run spl:metadata`   | Create metadata account associated to mint account  |

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
    1. [NFT account](https://explorer.solana.com/address/6KJfGGPw6tWws6JQ6pG1dbwTTQkWJqtSVQD1ySQtgg3W?cluster=devnet)
    2. [NFT mint transaction](http://explorer.solana.com/tx/Z1koZHmhYNZjBZutcDnhbJmZPFGP8TTz4aX9HZivdEQT7GgJ7ZW16dJuNZ9KMhykExJegn58mE9oQqiMZ4zsavf?cluster=devnet)
3. Update the NFT's name and metadata as the update authority
    1. [2° NFT minted](https://explorer.solana.com/address/4UEcuGwqMHg7AH2rXzF8rnRR5WEFBm8RgLthQLJBxqBt?cluster=devnet)
    2. [2° NFT mint transaction](https://explorer.solana.com/tx/3EEAy8JN99mS1vPPcn9KQz3yoXqFdxFte3Xqt4uT5U8weKUiRLBeJVxarPPhg8sAT17nxVhKBd4oyycaWvXALYWB?cluster=devnet)
    3. [2° NFT update transaction](https://explorer.solana.com/tx/3nh75snS6B4RHP6GV8dbT7a9ozdHCaHxZXJu2N47aB8tvZ1s4xv2XqtqEjyGtiWRrmEmURkB5JRirt2scPQCuSwP?cluster=devnet)

Optional:
1. Transfer the NFT ownership between wallets: [Transfer transaction](https://explorer.solana.com/tx/3PgryCa7iKsJKw1V23rq7JYctQ8mu2gHxeCkzMy6sYjSbq76W98qNxwU3SLBty6QATuknD2TuvQZ2caVN85sH8HH?cluster=devnet)
2. Permanently destroy the NFT and reclaim the rent fees: [Burn transaction](https://explorer.solana.com/tx/4ck75DNDL5rzEjwvDKxvJMtebs7qkahNPzWKqDRd7gAzSu39tYb4CgJRLe1EK9dPuUd4gEoJMTp6RPnunvyZtd6b?cluster=devnet)


