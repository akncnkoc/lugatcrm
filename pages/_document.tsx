import { Html, Head, Main, NextScript } from 'next/document'

export default function Document(props) {
  return (
    <Html>
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}