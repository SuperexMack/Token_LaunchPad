import './App.css'
import { TokenLaunchpad } from './components/TokenLaunchpad'
import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';


function App() {
  return(
    <>
   
    <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/1GcAeTdxUpNiEvq2IeIo_Cqm97P_J-R4"}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                  <div style={{width : "100%" , height:"20%" , display:"flex", justifyContent : "center" , alignItems : "center" , gap:"50px" , marginTop:"50px"}}>
                    <WalletMultiButton />
                    <WalletDisconnectButton />
                  </div>
                    { /* Your app's components go here, nested within the context providers. */ }
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
        <TokenLaunchpad></TokenLaunchpad>
    </>
  )
}

export default App
