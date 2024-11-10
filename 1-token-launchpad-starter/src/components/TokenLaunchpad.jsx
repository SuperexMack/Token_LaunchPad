import {useState} from "react"
import {createInitializeMint2Instruction, createMint, getMinimumBalanceForRentExemptMint, MINT_SIZE , TOKEN_PROGRAM_ID} from "@solana/spl-token"
import { Keypair, sendAndConfirmTransaction, SystemProgram, Transaction} from '@solana/web3.js';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";



export function TokenLaunchpad() {

    const [name , setName] = useState("")
    const [symbol ,setSymbol] = useState("")
    const [imageUrl , setImageUrl] = useState("")
    const [initialSupply , setInitialSupply] = useState("")

    let wallet = useWallet();
    let { connection } = useConnection();

    const createMint = async () => {
        try {
            if (!connection) {
                console.error("The Connection is not available.");
                return;
            }

            else if(!wallet.publicKey){
                console.error("wallet is not available.");
                return;
            }
    
            const lamports = await getMinimumBalanceForRentExemptMint(connection);
    
            const keypair = Keypair.generate();
    
            const transaction = new Transaction().add(
                SystemProgram.createAccount({
                    fromPubkey: wallet.publicKey,
                    newAccountPubkey: keypair.publicKey,
                    space: MINT_SIZE,
                    lamports,
                    programId: TOKEN_PROGRAM_ID,
                }),
                createInitializeMint2Instruction(
                    keypair.publicKey,
                    6,
                    wallet.publicKey,
                    wallet.publicKey,
                    TOKEN_PROGRAM_ID
                )
            );
    
            const recentBlockhash = await connection.getLatestBlockhash();
            transaction.recentBlockhash = recentBlockhash.blockhash;
            transaction.feePayer = wallet.publicKey;
    
            transaction.partialSign(keypair);
    
            const output = await wallet.sendTransaction(transaction, connection);
            console.log(output);
        } catch (error) {
            console.error("Error creating mint:", error);
        }
    };
    


    return  <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }}>
        <h1>Solana Token Launchpad</h1>
        <input onChange={(e)=>setName(e.target.value)} className='inputText' type='text' placeholder='Name'></input> <br />
        <input onChange={(e)=>setSymbol(e.target.value)} className='inputText' type='text' placeholder='Symbol'></input> <br />
        <input onChange={(e)=>setImageUrl(e.target.value)} className='inputText' type='text' placeholder='Image URL'></input> <br />
        <input onChange={(e)=>setInitialSupply(e.target.value)} className='inputText' type='text' placeholder='Initial Supply'></input> <br />
        <button onClick={createMint} className='btn'>Create a token</button>
    </div>
}