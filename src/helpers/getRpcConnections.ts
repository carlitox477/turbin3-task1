import { createSolanaRpc, createSolanaRpcSubscriptions } from "@solana/kit";

// Establish RPC connection
console.log("Establishing RPC connection...")
// await sleep(3000)
const rpc = createSolanaRpc("https://api.devnet.solana.com");

// creates a client for receiving real-time notifications from the Solana blockchain over WebSockets
// console.log("Subscribing to RPC connection...")
const rpcSubscriptions = createSolanaRpcSubscriptions(
  "wss://api.devnet.solana.com",
);

export { rpc, rpcSubscriptions };
