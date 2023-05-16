import { useEffect, useState } from 'react'
import '@/styles/globals.sass'
import { Layout } from '@/components'

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
