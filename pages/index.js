import Head from 'next/head';

import Layout from '../components/ui/layout';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>E-commerce product page</title>
        <meta name='description' content='E-commerce product page' />
        <link rel='icon' href='/favicon.png' />
      </Head>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    redirect: {
      destination: '/1',
    },
  };
}
