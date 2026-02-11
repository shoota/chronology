import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Noto_Sans_JP } from 'next/font/google'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-jp',
})

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div className={`${notoSansJP.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  )
}

export default App;
