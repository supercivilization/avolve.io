import { AuthLayout } from 'app/features/auth/layout.web'
import { SignUpScreen } from 'app/features/auth/sign-up-screen'
import Head from 'next/head'

import { NextPageWithLayout } from './_app'

const Page: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Sign up</title>
    </Head>
    <SignUpScreen />
  </>
)

Page.getLayout = (children) => <AuthLayout>{children}</AuthLayout>

// Disable SSG for this page to avoid prerendering issues
export const getServerSideProps = async () => {
  return { props: {} }
}

export default Page
