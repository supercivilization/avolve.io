'use client'

import { TamaguiProvider } from 'app/provider/tamagui'
import { NextThemeProvider } from '@tamagui/next-theme'
import { SafeAreaProvider } from 'app/provider/safe-area'
import { ToastProvider } from 'app/provider/toast'

// Note: App Router layout - simplified providers without Solito router
// For full provider stack, use Pages Router
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/tamagui.css" />
      </head>
      <body>
        <NextThemeProvider skipNextHead>
          <SafeAreaProvider>
            <TamaguiProvider>
              <ToastProvider>
                {children}
              </ToastProvider>
            </TamaguiProvider>
          </SafeAreaProvider>
        </NextThemeProvider>
      </body>
    </html>
  )
}
