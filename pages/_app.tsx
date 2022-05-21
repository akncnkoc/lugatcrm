import Router from "next/router"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import "../styles/globals.css"
import { useEffect } from "react"
import { ThemeProvider } from "styled-components"
import Layout from "../components/Layout"
import { ModalProvider } from "../context/modal-context"
import { ConfirmContextProvider } from "../modals/global/useConfirm"

import { defaultTheme, GlobalStyle } from "../styles/theme-config"

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
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <ModalProvider>
        <ConfirmContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ConfirmContextProvider>
      </ModalProvider>
    </ThemeProvider>
  )
}
