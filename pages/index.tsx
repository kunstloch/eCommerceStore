import React, { useState, Component } from 'react';
import Head from 'next/head';
import Nav from '../components/nav';
import Header from '../components/header';
import Search from '../components/search';
import Link from 'next/link';
import fetch from 'cross-fetch';
import styled from 'styled-components';

const Productlink = styled.a`
  text-decoration: none;
  color: #8c8084;

  sty & ul {
    text-decoration: none;
    list-style-image: none;
  }

  & *:hover {
    background-color: #8c8084;
    color: #eedca8;
    cursor: pointer;
    text-decoration: none;
  }
`;

const Main = styled.div`
  margin-top: 300px;
`;

const ListUl = styled.ul`
  list-style-type: none;
`;

const ProductList = styled.div`
  grid-column: 2;
  grid-row: 4;
  align-items: center;
`;

type Props = {
  product: {
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

const Home = (props: Props) => {
  console.log(props);
  const [selection, setSelection] = useState('rating');

  const productObject = props.product.map(product => (
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

          <br />
        </div>
      </li>
    </Productlink>
  ));

  return (
    <Main>
      <ProductList>
        <style jsx>
          {`
            .hero {
              width: 100%;
              color: #333;
            }
            .title {
              margin: 0;
              width: 100%;
              padding-top: 80px;
              line-height: 1.15;
              font-size: 48px;
            }
            .title,
            .description {
              text-align: center;
            }
            .row {
              max-width: 880px;
              margin: 80px auto 40px;
              display: flex;
              flex-direction: row;
              justify-content: space-around;
            }
            .card {
              padding: 18px 18px 24px;
              width: 220px;
              text-align: left;
              text-decoration: none;
              color: #434343;
              border: 1px solid #9b9b9b;
            }
            .card:hover {
              border-color: #067df7;
            }
            .card h3 {
              margin: 0;
              color: #067df7;
              font-size: 18px;
            }
            .card p {
              margin: 0;
              padding: 12px 0 0;
              font-size: 13px;
              color: #333;
            }
          `}
        </style>
        <div>
          <h2>Top Produkte</h2>
          <div>
            selection: {selection}
            <select
              value={selection}
              onChange={e => {
                setSelection(e.target.value);
              }}
            >
              <option value="rating">Rating</option>
              <option value="price">Price</option>
              <option value="id">Most Popular</option>
            </select>
            <button>V</button>
            <button>Λ</button>
          </div>
          <ListUl>{productObject}</ListUl>
        </div>
        <button>Previous 3 Products</button>
        <button>Next 3 Products</button>
        <br />
        <br />
      </ProductList>
    </Main>
  );
};

Home.getInitialProps = async ({ selection }) => {
  console.log('selection:', selection);
  const response = await fetch(`http://localhost:3000/api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      rankingNow: selection
    })
  });

  const data = await response.json();

  return { product: data.rows };
};

export default Home;
