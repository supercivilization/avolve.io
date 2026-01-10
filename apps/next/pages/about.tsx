import { AboutScreen } from 'app/features/about'
import type { GetStaticProps } from 'next'
import Head from 'next/head'

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About | Avolve</title>
        <meta name="description" content="Learn about Avolve and our mission to help solopreneurs master every role in their business." />
      </Head>
      <AboutScreen />
    </>
  )
}

// ISR: Regenerate every 24 hours
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 86400, // Revalidate every 24 hours
  }
}
