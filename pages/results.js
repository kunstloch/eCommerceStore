import React, { useState, Component } from 'react';
import styled from 'styled-components';
import allproducts from '../data';
import Link from 'next/link';
import Search from './search';
import { useRouter } from 'next/router';

const Productlink = styled.a`
  max-width: 150px;
  text-decoration: none;

  & * {
    max-width: 150px;
  }

  & *:hover {
    background-color: gray;
    cursor: pointer;
  }
`;

const Results = () => {
  const router = useRouter();

  const searchValue = router.query.q;
  console.log(searchValue);

  const searchArray = allproducts.filter(function(element) {
    return element.productName.includes(searchValue);
  });
  const allproductsMaped = allproducts.map((product, key) => product.id);

  const mapSearchArray = searchArray.map((product, key) => (
    <Productlink href={'/products/' + product.productName}>
      <li key={product.id}>
        {product.productName} - {product.unit} {product.measure}
        <br />
        <img src={product.img} width="100px"></img>
        <p>{product.infoShort}</p>
        <br />
      </li>
    </Productlink>
  ));

  return (
    <>
      <div>
        <ul>{mapSearchArray}</ul>
      </div>

      <br />
      <br />
      <br />
      <hr />
    </>
  );
};

export default Results;
