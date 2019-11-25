import Document, { Head, Main, NextScript } from 'next/document';
import * as React from 'react';
import Link from 'next/link';
import Header from './header';
import Search from './search';
import Nav from './nav';

import styled, { ServerStyleSheet, createGlobalStyle } from 'styled-components';

const StyledSearch = styled(Search)`
  /* grid-column: 3;
  grid-row: 2; */
`;
const StyledNav = styled(Nav)`
  /* grid-column: 1;
  grid-row: 3; */
`;

const GlobalStyle = createGlobalStyle`
body {
  margin: 0px;
  color: #523924;
}`;

const Body = styled.body`
  color: #523924;
  font-family: 'Noto Sans', sans-serif;

  /* display: grid;
  grid-gap: 10px;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: 100px 200px 100px 500px auto; */
`;

const StyledSearch = styled(Search)`
  /* grid-column: 3;
  grid-row: 2; */
`;
const StyledNav = styled(Nav)`
  /* grid-column: 1;
  grid-row: 3; */
`;

const StyledMain = styled(Main)`
  margin-top: 200px;
`;

// type Props = {
//   title?: string;
// };

function Layout({ children }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css?family=Noto+Sans:400,700,700i&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Header />
      <StyledNav />

      <StyledSearch />
      <StyledMain />
      <NextScript />
      {children}
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    </>
  );
}

export default Layout;
