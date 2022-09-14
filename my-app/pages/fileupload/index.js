import { useMoralis } from "react-moralis"
import { useRouter } from "next/router"
import { useState, useEffect } from "react";
import { abi, contractAddress, contractAddress2, abi2 } from '../constants/index';
import { ethers } from "ethers";
// import { Moralis } from "moralis";
import Web3  from 'web3';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";


// const { ethers, network } = require("hardhat");
const web3 = new Web3(Web3.givenProvider);
const PRICE = ethers.utils.parseEther("0.01");

export default function Dashboard() {
    //set Moralis Hooks and state variables
    const { isWeb3Enabled, logout, user, Moralis, isAuthenticated } = useMoralis();
    const router = useRouter();
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ file, setFile ] = useState(null);

    // This function mints our NFT
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // set the file name to capture
            // create a new Moralis file
            // save the new file to IPFS
            const file1 = new Moralis.File(file.name, file);
            await file1.saveIPFS();
            const file1url = file1.ipfs();

            // define the metadata for our NFT
            const metadata = {
                name, 
                description, 
                image: file1url
            }

            // convert our metadata to base64
            const file2 = new Moralis.File(`${name}metadata.json`, {
                base64: Buffer.from(JSON.stringify(metadata)).toString('base64')
            }); 

            // save our metadata
            await file2.saveIPFS();
            const metadataurl = file2.ipfs();

            // create a new web3 contract using our contract address and abi
            // from the nft Minter contract we deplpoyed on polygon
            const contract = new web3.eth.Contract(abi, contractAddress);
            const response = await contract.methods
                .mint(metadataurl)
                .send({ from: user.get('ethAddress') })
            const tokenId = response.events.Transfer.returnValues.tokenId;
            alert(`NFT Minted Successfully.  Contract Address - ${contractAddress} with a token ID of: ${tokenId}`)
            console.log("Approving NFT...")
            const approvalTx = await contract.methods.approve(contract.address, tokenId)
            console.log(approvalTx)
            // call listItem on our marketplace contract to list our new NFT.
           /* console.log("Listing NFT...") 
            const nftMarketplace = new web3.eth.Contract(abi2, contractAddress2);
            const tx = await nftMarketplace.methods
                .listItem(contractAddress, tokenId, PRICE)
            console.log(tx); 
            alert('NFT Successfully listed!') */
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Navbar/>
            <div className="flex w-screen h-screen items-center justify-center bg-black">
                <form onSubmit={onSubmit}>
                    <div className="w-[100px] h-[50px]">
                        <input 
                            type="text" 
                            className=" border-[1px] p-2 border-black text-lg w-[300px]" 
                            placeholder="Document Name"
                            value={name}
                            onChange={e => setName(e.target.value)}></input>
                    </div>
                    <div className="w-[100px] h-[50px] mt-3">
                        <input 
                            type="text" 
                            className=" border-[1px] p-2 border-black text-lg w-[300px]" 
                            placeholder="Description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}></input>
                    </div>
                    <div className="w-[100px] h-[50px] mt-3">
                        <input 
                            type="file" 
                            className="border-[1px] p-2 border-black text-lg w-[300px]" 
                            onChange={(e) => setFile(e.target.files[0])}></input>
        
                    </div>
                    <button type="submit" className="neon_btn mt-5  bg-white text-xl rounded-l animate-bounce">Mint!</button>
                    <button onClick={logout} className="neon_btn mt-5  bg-white text-xl rounded-l">Logout</button>
                </form>
            </div>
            <Footer/>
        </div>
    )
} 