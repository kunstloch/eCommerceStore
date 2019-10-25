import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const ContainerHeader = styled.header`
  /* background-image: url('/static/ErnteDankBG01.png');
  background-color: #eedca8; */
  position: fixed;
`;

const HeaderTitel = styled.h1`
  color: #523924;
  float: inline-start;
  background-color: #eedca8;
  padding: 0px;
  align-items: center;
  justify-content: center;
  margin: 0;
`;

const HeaderImg = styled.img`
  position: fixed;
  background-color: white;
  padding: 0;
  margin: 0;
  width: 100%;
  height: auto;
  top: 0px;
`;

const Logo = styled.img`
  position: fixed;
  z-index: 5;
  left: 45%;
`;

const Lefth1 = styled.h1`
  position: fixed;
  z-index: 5;
  left: 17%;
  top: 3px;
  font-size: 12vh;
`;
const Right1 = styled.h1`
  position: fixed;
  z-index: 5;
  left: 58%;
  top: 3px;
  font-size: 12vh;
`;

export default function Header() {
  return (
    <ContainerHeader>
      <HeaderImg src="/static/LOGOgesamt.png" alt="Logo" height="150px" />
    </ContainerHeader>
  );
}
