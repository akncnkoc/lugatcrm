import Router from "next/router"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { useEffect } from "react"
import Layout from "../components/Layout"
import { ModalProvider } from "../context/modal-context"
import { ConfirmContextProvider } from "../modals/global/useConfirm"
import "../styles/globals.css"

import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  .animate-spin {
    animation: spin 1s linear infinite;
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
      <GlobalStyles />
      <ConfirmContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ConfirmContextProvider>
    </ModalProvider>
  )
}
