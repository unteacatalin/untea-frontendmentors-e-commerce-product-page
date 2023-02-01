import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Layout from '../components/ui/layout';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push('/1');
  }, [router]);
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

// export async function getStaticProps() {
//   return {
//     redirect: {
//       destination: '/1',
//     },
//   };
// }
