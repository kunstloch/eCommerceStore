import React, { useState, Component } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import fetch from 'cross-fetch';
import styled from 'styled-components';

import { setConfig } from 'react-hot-loader';

setConfig({ pureSFC: true });

const Main = styled.div`
  margin-top: 30px;
`;

type Props = {
  data: {
    rows: Array<{
      id: Number;
      productname: String;
      price: Number;
      img: string;
      key: Number;
      unit: Number;
      infoshort: String;
      infolong: String;
      measure: String;
    }>;
  };
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

const ListUl = styled.ul`
  list-style-type: none;
`;

const WithInitialProps: NextPage<Props> = ({ data }) => {
  // console.log(data.rows);
  const productObject = data.rows.map((product) => (
    <Productlink href={'/products/' + product.productname}>
      <li key="id">
        <br />

        <div>
          <h2> {product.productname}</h2>
          <div>
            {' '}
            {product.unit} {product.measure} - {product.price} €
          </div>
          <br />
          <img src={product.img} width="250px" />
          <p>{product.infoshort}</p>
          <p>{product.infolong}</p>
          <br />
        </div>
      </li>
    </Productlink>
  ));
  return (
    <Main>
      <h1>PRODUCT LIST</h1>

      <p>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </p>
      <p>NASE! NASE! </p>
      <ListUl>{productObject}</ListUl>
      <div style={{ wordBreak: 'break-all' }}>{JSON.stringify(data)}</div>
    </Main>
  );
};

WithInitialProps.getInitialProps = async ({ query }) => {
  const response = await fetch(
    `https://` + process.env.HOST + `/api` || `http://localhost:3000/api`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        productname: query.productname,
      }),
    }
  );

  const data = await response.json();
  // console.log('DATA: ' + data);
  return { data };
};

export default WithInitialProps;
