import React, { useState, Component } from 'react';
import getAllProducts from '../../data';
import { useRouter } from 'next/router';
import nextCookie from 'next-cookies';
import Cookies from 'js-cookie';
import Router from 'next/router';
import Nav from '../../components/nav';
import Header from '../../components/header';
import Search from '../../components/search';

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
export default function Product() {
  const router = useRouter();

  const myProduct = allproducts.find(function(element) {
    return element.productName === router.query.name;
  });

  const [productAmount, setProductAmount] = useState(1);
  const handleAmountInputChanges = event => {
    setProductAmount(event.target.value);
  };
  const id = myProduct.id;

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
      } else if (Cookies.get('Cart').includes(`\"id\":` + myProduct.id + `,`)) {
        // Check if ID is already in cart. Add value to amount.
        let cookieOld = JSON.parse(Cookies.get('Cart'));
        changeAmount(id, productAmount);
        function changeAmount(id, productAmount) {
          for (var i in cookieOld) {
            if (cookieOld[i].id == id) {
              cookieOld[i].productAmount =
                cookieOld[i].productAmount + productAmount * 1;
              break;
            }
          }
        }
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
      query: { name: 'cart' }
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
        <p>Mein Cookie: {Cookies.get('Cart')}</p>
      </div>
    </>
  );
}

Product.getInitialProps = async () => {
  return {};
};
