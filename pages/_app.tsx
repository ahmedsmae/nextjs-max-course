import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../components/layout/layout';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Head>
        <title>Ahmed Afifi Blog</title>
        <meta name='description' content='My personal blogging website' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='keywords' content='Personal, Blog, Post' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
