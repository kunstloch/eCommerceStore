import React, { useState, Component } from 'react';
import getAllProducts from '../../data';
import { useRouter } from 'next/router';
import nextCookie from 'next-cookies';
import Cookies from 'js-cookie';
import Router from 'next/router';
import Nav from '../../components/nav';
import Header from '../../components/header';
import Search from '../../components/search';
import fetch from 'cross-fetch';

type Props = {
  product: {
    id: Number;
    productname: String;
    price: Number;
    img: string;
    key: Number;
    unit: Number;
    infoshort: String;
    infolong: String;
    measure: String;
  };
};

function changeAmount(id, productAmount, cookieOld) {
  for (var i in cookieOld) {
    if (cookieOld[i] && cookieOld[i].id == id) {
      cookieOld[i].productAmount =
        cookieOld[i].productAmount + productAmount * 1;
      break;
    }
  }
}

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
const allproducts = getAllProducts();
export default function Product(props: Props) {
  const router = useRouter();

  // const props.product = allproducts.find(function(element) {
  //   return element.productName === router.query.name;
  // });
  if (!props.product) return <div>Product not found.</div>;

  const [productAmount, setProductAmount] = useState(1);
  const handleAmountInputChanges = event => {
    setProductAmount(event.target.value);
  };
  const id = props.product.id;

  // * 1 to covert Strint to Number. Better way?

  const sendCookies = event => {
    const productWithAmount = [
      {
        id: id,
        productAmount: productAmount * 1
      }
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
      pathname: '/cart'
    });

    /*  redirect();
    function redirect() {
      var url = '/cart';
      window.location.href = url; 
    }*/
  };

  return (
    <>
      <h1>PRODUCT</h1>
      <br />

      <div>
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
      </div>
    </>
  );
}

Product.getInitialProps = async ({ query }) => {
  console.log(query);
  const response = await fetch(`http://localhost:3000/api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      productname: query.productname
    })
  });

  const data = await response.json();

  return { product: data.rows[0] };
};
