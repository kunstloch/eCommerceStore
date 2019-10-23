import Document, { Head, Main, NextScript } from 'next/document';
import Nav from '../components/nav';
import Header from '../components/header';
import Search from '../components/search';
import nextCookie from 'next-cookies';

// Import styled components ServerStyleSheet
import styled, { ServerStyleSheet } from 'styled-components';

const Body = styled.body`
  color: #523924;
  font-family: 'Noto Sans', sans-serif;

  display: grid;
  grid-gap: 10px;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: 100px 200px 100px 500px auto;
`;

const StyledHeader = styled(Header)`
  grid-column: 1 / 3;
  grid-row: 2;
  display: flex;
  flex-direction: row;
  background-image: url('/static/ErnteDankBG.png');
`;
const StyledSearch = styled(Search)`
  grid-column: 3;
  grid-row: 2;
`;
const StyledNav = styled(Nav)`
  grid-column: 1;
  grid-row: 3;
`;

const StyledMain = styled(Main)`
  grid-column: 2;
  grid-row: 4;
`;

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();

    // Step 2: Retrieve styles from components in the page
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement();

    // Step 4: Pass styleTags as a prop
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          {/* Step 5: Output the styles in the head  */}
          {this.props.styleTags}
        </Head>
        <Body>
          <StyledNav />
          <StyledHeader />

          <StyledSearch />
          <StyledMain />
          <NextScript />
        </Body>
      </html>
    );
  }
}

//    GET INFO FROM COOKIE 'SUM'

/* export default function MyDocument(props) {
      console.log(props.cookies.Sum);
      const totalInCart = props.cookies.Sum;
      const totalInCartObject = JSON.parse(totalInCart);
      console.log(totalInCartObject);
    }
*/
