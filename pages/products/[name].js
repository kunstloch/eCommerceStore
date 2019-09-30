import React, { useState, Component } from 'react';
import Head from 'next/head';
import Nav from '../../components/nav';
import Link from 'next/link';
import Search from '../search';
import allproducts from '../../data';
import { useRouter } from 'next/router';
import nextCookie from 'next-cookies';
import Cookie from 'js-cookie';

//   allproducts

//   productName: 'Apfelringe',
//   id: 0,
//   category: 'Obst',
//   price: 3.5,
//   measure: 'g',
//   unit: 100,
//   img:
//   infoShort:
//   infoLong:
//   inCart: false,
//    amount: false,
//   rating: 4.9

export default function Product() {
  const router = useRouter();

  const myProduct = allproducts.find(function(element) {
    return element.productName === router.query.name;
  });

  const [productAmount, setProductAmount] = useState(1);
  const handleAmountInputChanges = event => {
    setProductAmount(event.target.value);
  };
  const productId = myProduct.id;

  const sendCookies = event => {
    const productWithAmount = {
      productId: productId,
      productAmount: productAmount
    };
    let myFirstCookie = 'Cart=' + JSON.stringify(productWithAmount);

    console.log(productWithAmount);
    document.cookie = myFirstCookie;
  };

  return (
    <>
      <h1>PRODUCT</h1>
      <br />

      <div>
        <h2> {myProduct.productName}</h2>
        <div>
          {' '}
          {myProduct.unit} {myProduct.measure} - {myProduct.price} €
        </div>
        <br />
        <img src={myProduct.img} width="250px"></img>
        <p>{myProduct.infoShort}</p>
        <p>{myProduct.infoLong}</p>
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
        <p></p>
      </div>
    </>
  );
}

Product.getInitialProps = async () => {
  return {};
};
