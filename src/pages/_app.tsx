import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <SessionProvider session={session}>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Alternatif untuk modern browsers */}
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      
      {mounted && <Component {...pageProps} />}
    </SessionProvider>
  );
}

export default MyApp;