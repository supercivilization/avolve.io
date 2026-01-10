import { BlogScreen } from 'app/features/blog'
import type { GetStaticProps } from 'next'
import Head from 'next/head'

export default function BlogPage() {
  return (
    <>
      <Head>
        <title>Blog | Avolve</title>
        <meta name="description" content="Learn how to master the 5 C-Suite roles in your business. Actionable insights for solopreneurs." />
      </Head>
      <BlogScreen />
    </>
  )
}

// ISR: Regenerate every 6 hours
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 21600, // Revalidate every 6 hours
  }
}
