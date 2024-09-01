import React from 'react';
import Image from 'next/legacy/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { abi } from '../../contract-abi';
import FlipCard, { BackCard, FrontCard } from '../../components/FlipCard';



const contractConfig = {
  address: '0x1f7979C368c82dc647E075FfD61ed149052e3D6B',
  abi,
} as const;



const Home: NextPage = () => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const { isConnected } = useAccount();

  const {
    data: hash,
    writeContract: DevMint,
    writeContract: freeMint,
    writeContract: publicMint,
    isPending: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
  } = useWriteContract();

  const {
    data: txData,
    isSuccess: txSuccess,
    error: txError,
  } = useWaitForTransactionReceipt({
    hash,
    query: {
      enabled: !!hash,
    },
  });

  const isMinted = txSuccess;


  return (
    <div className={styles.container}>
      <Head>
        <title>Ham Pepes Mint Page</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
      <ConnectButton label="Start" />

        {mintError && (
              <p style={{ marginTop: 24, color: '#FF6257' }}>
                Error: {mintError.message}
              </p>
            )}
            {txError && (
              <p style={{ marginTop: 24, color: '#FF6257' }}>
                Error: {txError.message}
              </p>
            )}   

<p style={{ marginTop: 24, color: '#0028FC' }}>
          Public mint price 0.003 eth
        </p>
        <p style={{ margin: 24, color: '#0028FC' }}>
          Max 10 per wallet
        </p>

        <div style={{ flex: '0 0 auto' }}>
          <FlipCard>
            <FrontCard isCardFlipped={isMintLoading || isMintStarted}>
              <Image
                layout="responsive"
                src="/HamPepe_Intro_1.gif"
                width="800"
                height="800"
                alt="vintage pepe game"
                priority
              />
              
            </FrontCard>
            <BackCard isCardFlipped={isMintLoading || isMintStarted}>
                <Image
                  src="/slot machine 800.gif"
                  width="800"
                  height="800"
                  alt="pepe slot machines"
                  priority
                />
            </BackCard>
          </FlipCard>
        </div>
        
        


      {mounted && isConnected && !isMinted && (
        <button
                style={{ marginTop: 24 }}
                disabled={!freeMint || isMintLoading || isMintStarted}
                className="button"
                data-mint-loading={isMintLoading}
                data-mint-started={isMintStarted}
                onClick={() =>
                  freeMint?.({
                    ...contractConfig,
                    functionName: 'freeMint',
                    args: [1],
                  })
                }
              >
                {isMintLoading && 'Waiting for approval'}
                {isMintStarted && 'Minting...'}
                {!isMintLoading && !isMintStarted && 'Free Mint'}
              </button>
      )}
{/* {mounted && isConnected && !isMinted && (
        <button
                style={{ marginTop: 24 }}
                disabled={!publicMint || isMintLoading || isMintStarted}
                className="button"
                data-mint-loading={isMintLoading}
                data-mint-started={isMintStarted}
                onClick={() =>
                  publicMint?.({
                    ...contractConfig,
                    functionName: 'publicMint',
                    args: [2],
                  })
                }
              >
                {isMintLoading && 'Waiting for approval'}
                {isMintStarted && 'Minting...'}
                {!isMintLoading && !isMintStarted && 'Mint 1'}
              </button> 
)}
{mounted && isConnected && !isMinted && (
              <button
                style={{ marginTop: 24 }}
                disabled={!publicMint || isMintLoading || isMintStarted}
                className="button"
                data-mint-loading={isMintLoading}
                data-mint-started={isMintStarted}
                onClick={() =>
                  publicMint?.({
                    ...contractConfig,
                    functionName: 'publicMint',
                    args: [2],
                  })
                }
              >
                {isMintLoading && 'Waiting for approval'}
                {isMintStarted && 'Minting...'}
                {!isMintLoading && !isMintStarted && 'Mint 2'}
              </button>
)}

              {mounted && isConnected && !isMinted && (
              <button
                style={{ marginTop: 24 }}
                disabled={!publicMint || isMintLoading || isMintStarted}
                className="button"
                data-mint-loading={isMintLoading}
                data-mint-started={isMintStarted}
                onClick={() =>
                  publicMint?.({
                    ...contractConfig,
                    functionName: 'publicMint',
                    args: [4],
                  })
                }
              >
                {isMintLoading && 'Waiting for approval'}
                {isMintStarted && 'Minting...'}
                {!isMintLoading && !isMintStarted && 'Mint 4'}
              </button>
            )} */}



        
      </main>

      <footer className={styles.footer}>
        <a href="https://warpcast.com/based-bren" rel="noopener noreferrer" target="_blank">
          Made with ❤️ by your fren @based-bren
        </a>
      </footer>
    </div>
  );
};

export default Home;
