import React, { useState, Component } from 'react';
import Nav from '../components/nav';
import Header from '../components/header';
import getAllProducts from '../data';
import { useRouter } from 'next/router';
import nextCookie from 'next-cookies';
import Cookies from 'js-cookie';
import Search from '../components/search';
import fetch from 'cross-fetch';
import styled from 'styled-components';

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

const allproducts = getAllProducts();

export default function Cart(props) {
  console.log('Cookie:', props.cookies.Cart);
  const productsInCart = props.cookies.Cart;
  const productsInCartArray = JSON.parse(productsInCart);
  console.log(productsInCartArray);
  const allProductsInCart = [];
  productsInCartArray.forEach((itm, i) => {
    allProductsInCart.push(Object.assign({}, itm, props.product[i]));
  });

  allProductsInCart.forEach(function(element) {
    element.totalPrice = element.price * element.productAmount;
  });
  const [newAllProductsInCart, setNewAllProductsInCart] = useState(
    allProductsInCart
  );

  // const handleDelete = e => {
  //   const { id } = e.target.parnetElement;
  //   newAllProductsInCart.[]
  //  }

  const [value, setValue] = useState(1);

  console.log(newAllProductsInCart);

  const totalPriceAllProducts = allProductsInCart.reduce(
    (a, { totalPrice }) => a + totalPrice,
    0
  );

  const totalAmountAllProducts = allProductsInCart.reduce(
    (a, { productAmount }) => a + productAmount,
    0
  );

  // Cookie with TotalPrice and TotalAmount

  const totalsInfo = {
    PriceT: totalPriceAllProducts,
    AmountT: totalAmountAllProducts
  };
  let totalCookie = JSON.stringify(totalsInfo);
  console.log(totalCookie);
  Cookies.set('Sum', totalCookie);

  // Map Array
  const mapAllProductsInCart = newAllProductsInCart.map((product, id) => (
    <>
      <Productlink href={'/products/' + product.productname}>
        <br />
        <br />
        <li>
          <img src={product.img} width="250px" />
          <br />
          Amount: {product.productAmount} - {product.productname} - Price per
          Unit: {product.price} EUR - Price: {product.totalPrice} EUR
        </li>
      </Productlink>
      <input type="number" min="0" max="50" />

      <br />
      <br />
    </>
  ));

  // const productsInCart = Cookies.get('Cart', { path: '/products' });
  //console.log(productsInCart);
  //const ProductsInCartArray = JSON.parse(productsInCart);

  return (
    <>
      <div>{mapAllProductsInCart}</div>
      <div>WICHTIG!!! </div>
      <div>Total: {totalPriceAllProducts} EUR </div>
      <div>Total Amount of Products: {totalAmountAllProducts}</div>
      <div></div>
    </>
  );
}

// Cart.getInitialProps = async ctx => {
//   console.log('NASE 2');
//   console.log(JSON.stringify(nextCookie(ctx)));
//   return { cookies: nextCookie(ctx) };
// };

Cart.getInitialProps = async ctx => {
  const cookies = nextCookie(ctx);
  console.log('cookies.Cart');
  console.log(cookies.Cart);
  console.log(typeof cookies.Cart);
  const listOfIdsString = JSON.parse(cookies.Cart);
  const listOfIds = listOfIdsString.map(obj => obj.id);
  console.log('listOfIds');
  console.log(listOfIds);
  const listOfIdNoArray = '(' + listOfIds.join(', ') + ')';
  console.log('listOfIdNoArray');
  console.log(listOfIdNoArray);

  const response = await fetch(`http://localhost:3000/api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      incart: listOfIdNoArray,
      listOfIds
    })
  });

  const data = await response.json();

  console.log(cookies);
  console.log(' sollte von zwei IDs sein');
  console.log(data.rows);
  return { product: data.rows, cookies: cookies };
};
