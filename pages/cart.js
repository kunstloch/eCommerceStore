import React, { useState, Component } from 'react';
import Router from 'next/router';
import getAllProducts from '../data';
import Link from 'next/link';
import nextCookie from 'next-cookies';
import Cookies from 'js-cookie';

import fetch from 'cross-fetch';
import styled from 'styled-components';



// const Productlink = styled.a`
//   text-decoration: none;
//   color: #8c8084;

//   sty & * {
//     text-decoration: none;
//   }

//   & *:hover {
//     background-color: #8c8084;
//     color: #eedca8;
//     cursor: pointer;
//     text-decoration: none;
//   }
// `;

// ****** NEW ********

const Productlink = styled.a`
  text-decoration: none;
  color: #8c8084;
  margin: 2px 12px;
  padding: 2px 22px;

  sty & ul {
    text-decoration: none;
    list-style-image: none;
  }

  & :hover {
    border: 1px solid #523924;
    border-radius: 15px;
    cursor: pointer;
    text-decoration: none;
    padding: 0px 20px;
  }
`;

const H1 = styled.h1`
  /* position: fixed;
  font-size: 10vw; */
  color: #523924;
  text-align: left;
`;

const H3 = styled.h3``;

const Main = styled.div`
  margin-top: 30px;
  margin-left: 30px;
`;

const ListUl = styled.ul`
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 70px;
  margin-bottom: 70px;
  margin-top: 70px;
`;

const ProductList = styled.div`
  grid-column: 2;
  grid-row: 4;
  align-items: center;
`;

const ProductName = styled.h2`
  padding: 3px;
  margin: 3px;
`;

const ProduktLi = styled.li`
  padding: 3px;
  margin: 3px;
`;

const ProductContainer = styled.div`
  margin: 20px;
`;

const HR = styled.hr`
  margin: 20px 40px 20px 20px;
  border-top: 3px dotted #523924;
`;

const NextProducts = styled.div`
  bottom: 0;
`;

const Span = styled.span`
  display: block;
`;

// ****** OLD ********

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

const CartLogo = styled.img`
  margin: 10px;
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

const IMG = styled.img`
  box-shadow: 22px 22px 52px -21px rgba(0, 0, 0, 0.39);
`;

// const TitelH2 = styled.h2`
//   margin-top: 45px;
// `;

const allproducts = getAllProducts();

export default function Cart (props) {
  console.log('Cookie:', props.cookies.Cart);

  if (props.cookies.Cart == undefined || null) {
    return (
      <Main>
        <DivH2>
          <CartLogo
            src="/static/CartSymbolBetter.png"
            alt="Cart Symbol"
            width="70px"
          />
          <H1>Produkte im Einkaufswagen</H1>
        </DivH2>
        <br />
        <HR />
        <div>
          <Waren>
            <H3>
              Ihr Einkaufswagen ist leer! Gehen Sie zu{' '}
              <Link href="/">
                <a>Home</a>
              </Link>{' '}
              und finden Sie Produkte, die Sie lieben werden.
            </H3>
          </Waren>
        </div>
        <HR />
      </Main>
    );
  } else {
    const productsInCart = props.cookies.Cart;
    const productsInCartArray = JSON.parse(productsInCart);
    console.log(productsInCartArray);
    const allProductsInCart = [];
    productsInCartArray.forEach((itm, i) => {
      allProductsInCart.push(Object.assign({}, itm, props.product[i]));
    });

    allProductsInCart.forEach(function (element) {
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
    const mapAllProductsInCart = newAllProductsInCart.map((product, key) => {
      const [amountOfProducts, setAmountofProducts] = useState(
        product.productAmount
      );
      const handleInputChange = e => {
        setAmountofProducts(e.target.value);
      };

      function handleClick () {
        let cookieParsed = JSON.parse(Cookies.get('Cart'));
        console.log('Cookie Parsed ', cookieParsed);
        cookieParsed[key].productAmount = amountOfProducts * 1;
        let newCookieToSet =
          'Cart=' + JSON.stringify(cookieParsed) + '; path=/';
        document.cookie = newCookieToSet;
      }

      return (
        <>
          <InfoLong>
            <h3>Produkt Information:</h3>
            <p>{product.infolong}</p>
          </InfoLong>

          <Productlink href={'/products/' + product.productname}>
            <li>
              <ProductName> {product.productname}</ProductName>
              <IMG src={product.img} width="90%" />
              <br />
              <br />
              Pro Einheit: {product.unit} {product.measure}
              <Span />
            </li>
          </Productlink>
          <Form>
            Preis pro Einheit: {product.price} EUR
            <br />
            Im Einkaufswagen: {product.productAmount}
            <br /> Gesamtpreis: {product.totalPrice} EUR
            <br />
            <br />
            <form onClick={handleClick}>
              Menge ändern:{` `}
              <input
                type="number"
                min="0"
                max="50"
                onChange={handleInputChange}
                value={amountOfProducts}
              />{' '}
              <button>Ändern</button>
            </form>
          </Form>
        </>
      );
    });

    // const productsInCart = Cookies.get('Cart', { path: '/products' });
    //console.log(productsInCart);
    //const ProductsInCartArray = JSON.parse(productsInCart);

    return (
      <Main>
        <DivH2>
          <CartLogo
            src="/static/CartSymbolBetter.png"
            alt="Cart Symbol"
            width="70px"
          />
          <H1>Produkte im Einkaufswagen</H1>
        </DivH2>
        <br />
        <HR />
        <div>
          <Waren>Waren im Warenkorb: {totalAmountAllProducts} Stück</Waren>
          <Waren>Gesamtbetrag: {totalPriceAllProducts} EUR </Waren>
        </div>
        <HR />
        <ProductContainer>
          <ListUl>{mapAllProductsInCart}</ListUl>
        </ProductContainer>

        <HR />
        <div>
          <Waren>Waren im Warenkorb: {totalAmountAllProducts} Stück</Waren>
          <Waren>Gesamtbetrag: {totalPriceAllProducts} EUR </Waren>
        </div>
        <HR />
      </Main>
    );
  }
}

// Cart.getInitialProps = async ctx => {
//   console.log('NASE 2');
//   console.log(JSON.stringify(nextCookie(ctx)));
//   return { cookies: nextCookie(ctx) };
// };

Cart.getInitialProps = async ctx => {
  const cookies = nextCookie(ctx);
  console.log('TYPE OF COOKIES', typeof cookies.Cart);
  console.log('COOKIES:', cookies);
  if (cookies.Cart == undefined || null) {
    return { cookies: cookies };
  } else {
    // console.log('cookies.Cart');
    // console.log(cookies.Cart);
    // console.log(typeof cookies.Cart);
    const listOfIdsString = JSON.parse(cookies.Cart);
    const listOfIds = listOfIdsString.map(obj => obj.id);
    // console.log('listOfIds');
    // console.log(listOfIds);
    const listOfIdNoArray = '(' + listOfIds.join(', ') + ')';
    // console.log('listOfIdNoArray');
    // console.log(listOfIdNoArray);


    const response = await fetch(
      process.env.HOSTAPI,
      //|| `http://localhost:3000/api`,
      {
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

    // console.log(cookies);
    // console.log(' sollte von zwei IDs sein');
    // console.log(data.rows);
    return { product: data.rows, cookies: cookies };
  }
};
