import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="sv">
        <Head />
        <body className="bg-[#F9F4F1] min-h-screen">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

