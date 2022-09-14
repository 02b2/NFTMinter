import Moralis from "moralis";
import { useEffect, useState } from "react"
import { useMoralis, useMoralisWeb3Api } from "react-moralis"
import { Card } from "web3uikit";
import Image from "next/image";

export default function NFTBox({ token_address, token_id }) {
    const [imageURI, setImageURI] = useState("")
    const [tokenName, setTokenName] = useState("")
    const [tokenDescription, setTokenDescription] = useState("")
    const [nftList, setNftList] = useState();
    const [imageLoaded, setImageLoaded] = useState();
    const Web3Api = useMoralisWeb3Api();

    // call the Moralis NFT api to get the data from our database
    async function updateUI() {
        const nftData = await Web3Api.Web3API.account.getNFTs({
            chain: "mumbai",
        })
    try {
        console.log(nftData)
        setNftList(nftData.result)
        console.log(nftData.result)
        const tokenURI = JSON.parse(nftList[token_id - 1].metadata)
        console.log(tokenURI.image)
        const imageURIURL = tokenURI.image
        setImageURI(imageURIURL)
        setTokenName(tokenURI.name)
        setTokenDescription(tokenURI.description)}
    catch(error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        if(!imageLoaded){
            updateUI()
        }
    }, [imageLoaded])

    return (
        <div className="w-[600px] h-[400px]">
            <Card>
                <Image loader={() => imageURI} src={imageURI} height="200" width="200"/> 
                <p>{tokenName}</p>
                <p>{tokenDescription}</p>
                <button onClick={updateUI} className="w-[200px] h-[50px] bg-green-400 rounded-2xl">Refresh</button>
            </Card>
        </div>
    )
}