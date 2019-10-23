import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const ContainerHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
const TitelBox = styled.div`
  width: 100%;
  background-color: #eedca8;
  height: 210px;
  background-image: url('/static/ErnteDankBG01.png');
  background-size: 125%;
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
          <HeaderTitel>ErnteDank regionale Produkte</HeaderTitel>
        </TitelBox>
      </ContainerHeader>
      <br />
    </>
  );
}
