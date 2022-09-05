import Head from 'next/head'
import Image from 'next/image'
import Upload from '../components/Upload'
import { ConnectButton } from "@web3uikit/web3"
import { useMoralis } from 'react-moralis'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  // enable router so we can easily change pages
  const router = useRouter();
  // enable isWeb3Enabled so we can ensure a wallet connection
  const { isWeb3Enabled} = useMoralis();
 // useEffect will constantly check to see isWeb3Enabled
 // if isWeb3Enabled is false, we stay on the login page
  useEffect(() => {
    if(isWeb3Enabled) {
      router.push('/dashboard')
    }
  }, [isWeb3Enabled])

  return (
    <div className='w-screen h-screen flex'>
      <Head>
        <title>DEROHive</title>
        <meta name="DEROHive" content="Web3 Whistleblower Documents" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Connect Button imported from web3uikit
          Connects to many different wallets out of the box*/}
      <ConnectButton moralisAuth={true} />
    </div>
  )
}
