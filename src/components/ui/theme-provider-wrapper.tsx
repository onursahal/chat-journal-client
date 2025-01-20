'use client'

import { ThemeProvider } from 'next-themes'

const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider
    defaultTheme="dark"
    attribute="class"
    disableTransitionOnChange
  >
    {children}
  </ThemeProvider>
)

export { ThemeProviderWrapper }
