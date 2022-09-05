import { MoralisProvider } from 'react-moralis'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    // Moralis Provider needs to wrap our main app and include our server URL as well as App ID
  <MoralisProvider serverUrl={process.env.NEXT_PUBLIC_SERVER_URL} appId={process.env.NEXT_PUBLIC_APP_ID}>
    <Component {...pageProps} />
  </MoralisProvider>)
}

export default MyApp
