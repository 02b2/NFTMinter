import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
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

    return (
        <>
        <Navbar/>
        
             <div className="text-black text-1xl bg-black grid">
        <hero className="flex justify-center" id="hero">  <section id="hero">
        <span><img className=" w-[40px] " src="/favicon.png" alt="logo"/></span>
          <div className="hero_text">
         <p className="blue_neon">CryptoEscondido</p>
            <h2>
                <span className="wrap hero_text _neon  ">
                    NFT MarketPlace</span>
            </h2>
          </div>
      </section>
      </hero>
                {fetchingListedNfts ? <div>Loading...</div> : ListedNfts.map((nft) => {
            console.log(nft.attributes)
            const { token_address, token_id } = nft.attributes
            return (
        
                    <NFTBox
                        token_address={token_address}
                        token_id={token_id}
                        key={`${token_id}${token_address}`}
                    />
                
            )
            })}
            </div>
            <Footer/>
        </>
    )
} 