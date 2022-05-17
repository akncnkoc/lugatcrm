import Router from "next/router"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { useEffect } from "react"
import Layout from "../components/Layout"
import { ModalProvider } from "../context/modal-context"
import { ConfirmContextProvider } from "../modals/global/useConfirm"
import "../styles/globals.css"

import { createGlobalStyle } from "styled-components"
import Head from "next/head"

const GlobalStyles = createGlobalStyle`
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  .container {
  width: 100%;
  }
  @media (min-width: 640px) {
    .container {
      max-width: 640px;
    }
  }
  @media (min-width: 768px) {
    .container {
      max-width: 768px;
    }
  }
  @media (min-width: 1024px) {
    .container {
      max-width: 1024px;
    }
  }
  @media (min-width: 1280px) {
    .container {
      max-width: 1280px;
    }
  }
  @media (min-width: 1536px) {
    .container {
      max-width: 1536px;
    }
  }
  body, html {
     font-family: Poppins, Helvetica, "sans-serif";
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    font-size: 14px;
  }
`

Router.events.on("routeChangeStart", () => NProgress.start())
Router.events.on("routeChangeComplete", () => NProgress.done())
Router.events.on("routeChangeError", () => NProgress.done())

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const { fetch: originalFetch } = window
    window.fetch = async (...args) => {
      NProgress.start()
      let [resource, config] = args
      const response = await originalFetch(resource, config)
      NProgress.done()
      return response
    }
  }, [])
  return (
    <ModalProvider>
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700"
        />
      </Head>
      <GlobalStyles />
      <ConfirmContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ConfirmContextProvider>
    </ModalProvider>
  )
}
