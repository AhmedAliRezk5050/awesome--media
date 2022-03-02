import Head from 'next/head';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/Spinner/Spinner';
import { useRouter } from 'next/router';
import RouteGuard from '../components/RouteGuard/RouteGuard';
import Layout from '../components/Layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet='UTF-8'></meta>
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
