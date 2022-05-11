import Layout from "../components/Layout"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import "../styles/globals.css"
import Router from "next/router"
import { ModalProvider } from "../context/modal-context"

Router.events.on("routeChangeStart", () => NProgress.start())
Router.events.on("routeChangeComplete", () => NProgress.done())
Router.events.on("routeChangeError", () => NProgress.done())

export default function App({ Component, pageProps }) {
  return (
    <ModalProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ModalProvider>
  )
}
