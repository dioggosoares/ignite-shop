import { useState } from 'react'
import { AppProps } from 'next/app'
import Router from 'next/router'
import TopBarProgress from 'react-topbar-progress-indicator'

import { Header } from '../components/Header'
import { globalStyles } from '../styles/global'
import { Container } from '../styles/pages/app'

// GLOBAL CSS - TAILWIND
import '../styles/global.scss'

globalStyles()

// CONFIG ROUTER LOADBAR
TopBarProgress.config({
  barColors: {
    '0': '#7465d450',
    '1.0': '#7465d4',
  },
  shadowBlur: 5,
})

export default function App({ Component, pageProps }: AppProps) {
  const [progress, setProgress] = useState(false)

  Router.events.on('routeChangeStart', () => {
    setProgress(true)
    // função chamada quando inicia o carregamento da page
  })

  Router.events.on('routeChangeComplete', () => {
    setProgress(false)
    // função chamada quando a nova page carregar
  })

  return (
    <Container>
      {progress && <TopBarProgress />}
      <Header />
      <Component {...pageProps} />
    </Container>
  )
}
