import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Search from './search';
import Nav from './nav';

const ContainerHeader = styled.header`
  width: 100%;
  left: 0px;
  z-index: 10;
`;

const Fixed = styled.div`
  position: fixed;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  align-items: center;
  background-color: #dfa365;
  border-bottom: 5px solid white;
`;

const StyledSearch = styled(Search)`
  position: fixed;
`;
const StyledNav = styled(Nav)`
  position: fixed;
`;

const H1 = styled.h1`
  /* position: fixed;
  font-size: 10vw; */
  color: #523924;
  font-size: 2.4vw;
  padding: 10px 0;
`;

const HeaderImg = styled.img`
  background-color: white;
  padding: 0;
  margin: 0;
  width: 100%;
  height: auto;
  margin-top: 120px;
  border-bottom: 3px solid #523924;
`;

export default function Header() {
  return (
    <ContainerHeader className="headerStyle">
      <Fixed>
        <Container>
          <StyledSearch />
          <H1>ErnteDank - eCommerce Store</H1>
          <StyledNav />
        </Container>
      </Fixed>
      <Link href="/">
        <a>
          <HeaderImg src="/static/LOGOgesamt.png" alt="Logo" height="150px" />
        </a>
      </Link>
    </ContainerHeader>
  );
}
