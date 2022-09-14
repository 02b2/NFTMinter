import Image from "next/image";
import { useMoralisQuery, useMoralis } from "react-moralis";
import { ethers } from "ethers";
import NFTBox from "../../components/NFTBox";

const PRICE = "0.001"
export default function Market() {
    const { data: ListedNfts, isFetching: fetchingListedNfts } = useMoralisQuery(
        "PolygonNFTTransfers",
        (query) => query.limit(10).descending("token_id")
    ) 
    console.log(ListedNfts)

    return (<div className="text-black text-4xl mx-auto mt-4 flex flex-col w-screen h-screen">

        {fetchingListedNfts ? <div>Loading...</div> : ListedNfts.map((nft) => {
            console.log(nft.attributes)
            const { token_address, token_id } = nft.attributes
            return (
                <div className="text-2xl flex flex-col">
                    <NFTBox 
                        token_address={token_address}
                        token_id={token_id}
                        key={`${token_id}${token_address}`}
                    />
                </div>
            )
        })}

    </div>)
}