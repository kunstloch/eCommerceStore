import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Search from './search';
import Nav from './nav';

const ContainerHeader = styled.header`
  width: 100%;

  z-index: 10;
  top: 0;
  position: fixed;
  margin: 0;
  padding: 0;
  border-top: 5px solid #523924;
  border-bottom: 5px solid #523924;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  align-items: center;
  background-color: #dfa365;
`;

const StyledSearch = styled(Search)`
  position: fixed;
`;
const StyledNav = styled(Nav)`
  position: fixed;
`;

const NewContainer = styled.div`
  display: inline-grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto;
  align-items: center;
`;

const H1Left = styled.h1`
  /* position: fixed;
  font-size: 10vw; */
  color: #523924;
  font-size: 2.5vw;
  padding: 0 10px;
  display: inline;
  margin: 0 10px;
  grid-column-start: 1;
  grid-column-end: 2;
`;

const H1Right = styled.h1`
  /* position: fixed;
  font-size: 10vw; */
  color: #523924;
  font-size: 2.5vw;
  padding: 0 10px;
  display: inline;
  margin: 0 10px;
  grid-column-start: 3;
  grid-column-end: 4;
`;

const Logo = styled.img`
  background-color: white;
  border-radius: 50%;
  width: 150px;
  margin: 3px 4px;
  grid-column-start: 2;
  grid-column-end: 3;
  /* width: 90px; */
  border: 5px solid white;
  box-shadow: 0px 5px 37px 0px rgba(0, 0, 0, 0.51);
`;

const HeaderImg = styled.img`
  background-color: white;
  padding: 0;
  margin: 0;
  width: 100%;
  height: auto;
  margin-top: 120px;
  border-bottom: 3px solid white;
`;

export default function Header() {
  return (
    <ContainerHeader className="headerStyle">
      <Container>
        <StyledSearch />
        <NewContainer>
          <H1Left>Regionale</H1Left>
          <Link href="/">
            <a>
              <Logo src="/static/erntedank.png" alt="Logo" />
            </a>
          </Link>
          <H1Right>Produkte</H1Right>
        </NewContainer>
        <StyledNav />
      </Container>

      {/* <Link href="/">
        <a>
          <HeaderImg src="/static/logogesamt1.png" alt="Logo" height="150px" />
        </a>
      </Link> */}
    </ContainerHeader>
  );
}
