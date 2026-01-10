import { DashboardOverviewScreen } from 'app/features/dashboard'
import { LandingScreen } from 'app/features/landing'
import { useSessionContext } from 'app/utils/supabase/useSessionContext'
import Head from 'next/head'

export default function IndexPage() {
  const { session, isLoading } = useSessionContext()

  if (isLoading) {
    return null
  }

  // Authenticated: Show the app overview (cockpit view)
  if (session) {
    return (
      <>
        <Head>
          <title>Avolve | Your Business Cockpit</title>
        </Head>
        <DashboardOverviewScreen />
      </>
    )
  }

  // Unauthenticated: Show landing page
  return (
    <>
      <Head>
        <title>Avolve | Master Every Role in Your Business</title>
        <meta
          name="description"
          content="Build a business that flies. Master the 5 C-Suite roles — CEO, CMO, CVO, COO, CFO — with proven frameworks and AI-powered tools."
        />
        <meta property="og:title" content="Avolve | Master Every Role in Your Business" />
        <meta
          property="og:description"
          content="Build a business that flies. Master the 5 C-Suite roles with proven frameworks."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://avolve.io" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Avolve | Master Every Role in Your Business" />
        <meta
          name="twitter:description"
          content="Build a business that flies with the C-Suite Framework for solopreneurs."
        />
      </Head>
      <LandingScreen />
    </>
  )
}
