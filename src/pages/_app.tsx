import type { AppProps } from "next/app"

import { AuthProvider } from "@/contexts/auth"
import { ToastContainer } from "react-toastify"

import "@/theme/global.scss"
import "react-toastify/dist/ReactToastify.css"

import "slick-carousel/slick/slick.css"

import "react-responsive-carousel/lib/styles/carousel.min.css"
import "slick-carousel/slick/slick-theme.css"

import Script from "next/script"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <Script src="/js/pace.min.js" />
      <ToastContainer
        limit={2}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
      />
    </AuthProvider>
  )
}
