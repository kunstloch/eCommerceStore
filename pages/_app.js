import React from 'react';
import App from 'next/app';

import Header from '../components/header';
import Footer from '../components/footer';

import styled from 'styled-components';
import createGlobalStyle from 'styled-components';

const Body = styled.body`
  color: #523924;
  font-family: 'Noto Sans', sans-serif;
  background-color: #fbf1e8;
  margin: 0;

  /* display: grid;
  grid-gap: 10px;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: 100px 200px 100px 500px auto; */
`;

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Noto+Sans:400,700,700i&display=swap"
            rel="stylesheet"
          ></link>
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/static/favicon.ico"
          />
        </head>
        <Body>
          <Header />

          <Component {...pageProps} />
        </Body>
        <Footer>Impressum</Footer>
      </>
    );
  }
}

export default MyApp;

// import App from 'next/app';
// import React from 'react';
// import Layout from '../components/Layout';

// export default class MyApp extends App {
//   render() {
//     const { Component, pageProps } = this.props;
//     return (
// <Layout>
//   <Component />
// </Layout>
//     );
//   }
// }
