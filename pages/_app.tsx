import Layout from "../components/Layout"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import "../styles/globals.css"
import Router from "next/router"
import { ModalProvider } from "../context/modal-context"
import { useEffect } from 'react';

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
  }, []);
  return (
    <ModalProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ModalProvider>
  )
}
