import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const ContainerHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  grid-column: 1 / 4;
  grid-row: 2;
  align-items: center;
`;
const TitelBox = styled.div`
  width: 100%;
  background-color: #eedca8;
  height: 210px;
  background-image: url('/static/ErnteDankBG.png');
  background-size: 80% auto;
`;

const HeaderTitel = styled.h1`
  color: #523924;
  float: inline-start;
  background-color: #eedca8;
  padding: 0px;
  align-items: center;
  justify-content: center;
`;

export default function Header() {
  return (
    <>
      <ContainerHeader>
        <TitelBox>
          <img></img>
          <HeaderTitel>ErnteDank regionale Produkte</HeaderTitel>
        </TitelBox>
      </ContainerHeader>
      <br />
    </>
  );
}
