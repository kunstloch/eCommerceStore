import React, { useState, Component } from 'react';
import styled from 'styled-components';
import getAllProducts from '../data';
import Link from 'next/link';
import Search from '../components/search';
import { useRouter } from 'next/router';
import Nav from '../components/nav';
import Header from '../components/header';
import fetch from 'cross-fetch';

type Props = {
  searchArray: {
    id: number;
    productname: string;
    price: number;
    img: string;
    key: number;
    unit: number;
    infoshort: string;
    infolong: string;
    measure: string;
  }[];
};

const Productlink = styled.a`
  text-decoration: none;
  color: #8c8084;

  sty & * {
    text-decoration: none;
  }

  & *:hover {
    background-color: #8c8084;
    color: #eedca8;
    cursor: pointer;
    text-decoration: none;
  }
`;

const MainList = styled.div`
  grid-column: 2;
  grid-row: 4;
  align-items: center;
`;

const Main = styled.div`
  margin-top: 300px;
`;

const ListUl = styled.ul`
  list-style-type: none;
`;

const Results = (props: Props) => {
  const router = useRouter();
  if (!props.searchArray) {
    console.log('ERROR product not found');
  }
  ///const searchValue = router.query.q;
  ///console.log(searchValue);

  //const searchArray = allproducts.filter(function(element) {
  //  return element.productname.includes(searchValue);
  //});
  //const allproductsMaped = allproducts.map((product, key) => product.id);

  const mapSearchArray = props.searchArray.map((product, key) => (
    <Productlink href={'/products/' + product.productname}>
      <li key={product.id}>
        {product.productname} - {product.unit} -{product.measure}
        <br />
        <img src={product.img} width="200px"></img>
        <p>{product.infoshort}</p>
        <br />
      </li>
    </Productlink>
  ));

  return (
    <Main>
      <MainList>
        <ListUl>{mapSearchArray}</ListUl>
      </MainList>

      <br />
      <br />
      <br />
      <hr />
    </Main>
  );
};

export default Results;

Results.getInitialProps = async ({ query }) => {
  console.log(query);
  const response = await fetch(`http://localhost:3000/api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      results: query.results
    })
  });

  const data = await response.json();
  console.log(data.rows);
  return { searchArray: data.rows };
};
