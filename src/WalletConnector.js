import React, { useState } from "react";
import { RadixDappToolkit, DataRequestBuilder, RadixNetwork } from "@radixdlt/radix-dapp-toolkit";

// Initialize RadixDappToolkit with client details
const rdt = RadixDappToolkit({
  networkId: RadixNetwork.Stokenet, // Connect to Stokenet (Testnet)
  dAppDefinitionAddress: "account_tdx_2_129jufgvvnda5t6n6yn48whgvjfvnmn8xq54t0hkrtfq263lmhpwlh9", // Provided dApp address
  applicationName: "Tamagotchi Game",
  applicationVersion: "1.0.0",
});

const WalletConnector = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  // Function to connect wallet
  const connectWallet = async () => {
    try {
      // Request at least one account from the connected wallet
      rdt.walletApi.setRequestData(DataRequestBuilder.accounts().atLeast(1));
      const walletResponse = await rdt.walletApi.sendRequest();

      if (walletResponse?.accounts?.length > 0) {
        setWalletAddress(walletResponse.accounts[0].address);
      } else {
        console.error("No accounts returned from wallet");
      }
    } catch (error) {
      console.error("Wallet connection error:", error);
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
      {walletAddress && <p>Connected Wallet: {walletAddress}</p>}
    </div>
  );
};

export default WalletConnector;
