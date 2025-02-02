// global styles shared across the entire site
import * as React from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import { logEvent } from '@amplitude/analytics-browser'
// used for rendering equations (optional)
import 'katex/dist/katex.min.css'
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-coy.css'
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'
import 'styles/global.css'
// this might be better for dark mode
// import 'prismjs/themes/prism-okaidia.css'
// global style overrides for notion
import 'styles/notion.css'
// global style overrides for prism theme (optional)
import 'styles/prism-theme.css'

import { initAmplitude } from '@/lib/amplitude'
import { bootstrap } from '@/lib/bootstrap-client'
import { isServer } from '@/lib/config'

if (!isServer) {
  bootstrap()
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  React.useEffect(() => {
    initAmplitude()

    function onRouteChangeComplete(url: string) {
      logEvent('페이지뷰', { url: url })
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }

    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    initAmplitude()
    logEvent('페이지뷰', { url: window.location.pathname })
  }, [])

  React.useEffect(() => {
    document.addEventListener('click', (e) => {
      const origin = (e.target as Element).closest(`a`)

      if (origin) {
        if (origin.target === '_blank')
          logEvent('링크클릭', { url: origin.href })
      }
    })
  }, [])

  return <Component {...pageProps} />
}
