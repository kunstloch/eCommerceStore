import React, { Component } from 'react';
import Head from 'next/head';
import Nav from '../../components/nav';
import Link from 'next/link';
import Search from '../search';
import allproducts from '../../data';
import { useRouter } from 'next/router';

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
  console.log(myProduct);
  // export default function Us(props) {
  //   console.log(props.url.query);
  //   const name = props.url.query.name; // "car"
  //   const product = products.find(product => {
  //     return product.name === name;
  //   });

  return (
    <>
      <h1>PRODUCT</h1>
      <br />

      <p>
        <h2> {myProduct.productName}</h2>
        <p>
          {' '}
          {myProduct.unit} {myProduct.measure} - {myProduct.price} €
        </p>
        <br />
        <img src={myProduct.img} width="250px"></img>
        <p>{myProduct.infoShort}</p>
        <p>{myProduct.infoLong}</p>
        <br />
      </p>
      <div>
        <form onsubmit={}>
          <label>Quantity: </label>
          <input name="Quantity" type="number" min="1"></input>
          <button>Put in Cart</button>
        </form>
      </div>

      <p></p>
    </>
  );
}

Product.getInitialProps = async () => {
  return {};
};
