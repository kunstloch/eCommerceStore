import React, { useState, Component } from 'react';

import { useRouter } from 'next/router';
import nextCookie from 'next-cookies';
import Cookies from 'js-cookie';
import Router from 'next/router';

import fetch from 'cross-fetch';
import styled from 'styled-components';


const ListUl = styled.ul`
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 70px;
  margin-bottom: 70px;
  margin-top: 70px;
`;

const H1 = styled.h1`
  /* position: fixed;
  font-size: 10vw; */
  color: #523924;
  text-align: left;
  margin: 40px 20px 10px 20px;
`;

const ProductName = styled.h2`
  padding: 3px;
  margin: 3px;
`;

const ProductContainer = styled.div`
  margin: 20px;
`;

const Span = styled.span`
  display: block;
`;

const HR = styled.hr`
  margin: 20px 40px 20px 20px;
  border-top: 3px dotted #523924;
`;

const InfoLong = styled.div`
  align-self: top;
  margin: 10px 10px 0 10px;
  font-size: 14px;
  text-align: justify;
`;

const Form = styled.div`
  align-self: end;
  margin-bottom: 20px;
  text-align: left;
`;

const DivH2 = styled.div`
  display: flex;
`;

const Waren = styled.p`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

const Productlink = styled.div`
  text-decoration: none;
  color: #8c8084;
  margin: 2px 12px;
  padding: 2px 22px;
  align-self: center;
`;

const IMG = styled.img`
  box-shadow: 22px 22px 52px -21px rgba(0, 0, 0, 0.39);
`;

// ************** old *************

const Main = styled.div`
  margin-top: 30px;
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
  };
};

// Product is already in cookie

function changeAmount(id, productAmount, cookieOld) {
  for (var i in cookieOld) {
    if (cookieOld[i] && cookieOld[i].id == id) {
      cookieOld[i].productAmount =
        cookieOld[i].productAmount + productAmount * 1;
      break;
    }
  }
}

// without database: const allproducts = getAllProducts();

export default function Product(props: Props) {
  const router = useRouter();

  if (!props.product) return <div>Product not found.</div>;

  const [productAmount, setProductAmount] = useState(1);
  const handleAmountInputChanges = (e) => {
    setProductAmount(e.target.value);
  };
  const id = props.product.id;

  // * 1 to covert Strint to Number. Better way?

  const sendCookies = (e) => {
    const productWithAmount = [
      {
        id: id,
        productAmount: productAmount * 1,
      },
    ];

    /* let myFirstCookie = 'Cart=' + JSON.stringify(productWithAmount);
    document.cookie = myFirstCookie; */

    checkCookie();
    const cookieHere = Cookies.get('Cart');
    function checkCookie() {
      if (Cookies.get('Cart') === undefined) {
        let myFirstCookie =
          'Cart=' + JSON.stringify(productWithAmount) + '; path=/';
        document.cookie = myFirstCookie;
      } else if (
        Cookies.get('Cart').includes(`\"id\":` + props.product.id + `,`)
      ) {
        // Check if ID is already in cart. Add value to amount.
        let cookieOld = JSON.parse(Cookies.get('Cart'));
        changeAmount(id, productAmount, cookieOld);

        document.cookie = 'Cart=' + JSON.stringify(cookieOld) + '; path=/';
      } else {
        let cookieOld = JSON.parse(Cookies.get('Cart'));
        const cookieNewArray = cookieOld.concat(productWithAmount);
        const sendcookieNewArray =
          'Cart=' + JSON.stringify(cookieNewArray) + '; path=/';
        document.cookie = sendcookieNewArray;
      }
    }

    Router.push({
      pathname: '/cart',
    });

    /*  redirect();
    function redirect() {
      var url = '/cart';
      window.location.href = url; 
    }*/
  };

  const product = props.product;

  return (
    <Main>
      <H1>Produkt Detailansicht</H1>
      <br />
      <HR />

      <ListUl>
        <InfoLong>
          <h3>Produkt Information:</h3>
          <p>{product.infolong}</p>
        </InfoLong>

        <Productlink>
          <li>
            <ProductName> {product.productname}</ProductName>
            <IMG src={product.img} width="90%" />
            <br />
          </li>
        </Productlink>

        <Form>
          <div>
            <p>
              Mengenangabe pro Einheit: {product.unit} {product.measure} <br />
              Preis pro Einheit: {product.price} EUR
              <br />
              Preis für ausgewählte Einheit: {product.price * productAmount} EUR
            </p>
          </div>

          <br />
          <br />
          <input
            id="chart"
            type="number"
            min="1"
            max="50"
            step="1"
            value={productAmount}
            onChange={handleAmountInputChanges}
          />
          <button onClick={sendCookies}>Put in Cart</button>
        </Form>
      </ListUl>

      {/* <div>
        <h2> {props.product.productname}</h2>
        <div>
          {' '}
          {props.product.unit} {props.product.measure} - {props.product.price} €
        </div>
        <br />
        <img src={props.product.img} width="250px"></img>
        <p>{props.product.infoshort}</p>
        <p>{props.product.infolong}</p>
        <br />
      </div>
      <div>
        <input
          id="chart"
          type="number"
          min="1"
          max="50"
          step="1"
          value={productAmount}
          onChange={handleAmountInputChanges}
        />
        <button onClick={sendCookies}>Put in Cart</button>
        <p>productAmount: {productAmount}</p>
        <p>Mein Cookie: {Cookies.get('Cart')}</p>
      </div> */}
    </Main>
  );
}

Product.getInitialProps = async ({ query }) => {
  // console.log(query);
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

  return { product: data.rows[0] };
};
