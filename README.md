# turbin3-task1
## SPL
1. Set env variable `DEVNET_SOLANA_PK` to private key deployer with `export $(grep -v '^#' .env | xargs)"` 
2. Run `npm run spl:init` to initialize mint account
3. Run `npm run spl:create-ata` to create  an ATA to mint authority
4. Run `npm run spl:mint` to mint 10 tokens account to mint authority ATA
5. Run `npm run spl:mint` to add metadata to mint account