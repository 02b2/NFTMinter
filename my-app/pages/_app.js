import { MoralisProvider } from 'react-moralis'
import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>CryptoEscondido</title>
        <meta className="CryptoEscondido" content="Web3 Whistleblower Documents" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Moralis Provider needs to wrap our main app and include our server URL as well as App ID */}
      <MoralisProvider serverUrl={process.env.NEXT_PUBLIC_SERVER_URL} appId={process.env.NEXT_PUBLIC_APP_ID}>
        <Component {...pageProps} />
      </MoralisProvider>
  </div>
  )
}

export default MyApp
