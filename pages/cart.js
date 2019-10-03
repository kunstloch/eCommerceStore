import React, { useState, Component } from 'react';
import Nav from '../components/nav';
import Header from '../components/header';
import getAllProducts from '../data';
import { useRouter } from 'next/router';
import nextCookie from 'next-cookies';
import Cookies from 'js-cookie';
import Search from '../components/search';

const allproducts = getAllProducts();

export default function Cart(props) {
  console.log('Cookie', props.cookies.Cart);
  const productsInCart = props.cookies.Cart;
  const productsInCartArray = JSON.parse(productsInCart);
  console.log(productsInCartArray);
  const allProductsInCart = [];
  productsInCartArray.forEach((itm, i) => {
    allProductsInCart.push(Object.assign({}, itm, allproducts[i]));
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
      <br />
      <br />
      <li>
        ProductName: {product.productName} - Amount: {product.productAmount} -
        Price per Unit: {product.price} EUR - Price: {product.totalPrice} EUR
      </li>
      {/*    <input
        type="number"
        min="0"
        max="50"
        value={newAllProductsInCart[id].productAmount}
        onChange={e => setNewAllProductsInCart(e.target.value)}
  />*/}

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

Cart.getInitialProps = async ctx => {
  // console.log(nextCookie(ctx));

  return { cookies: nextCookie(ctx) };
};
