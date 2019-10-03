import React, { useState, Component } from 'react';

import nextCookie from 'next-cookies';
import Cookies from 'js-cookie';

export default function Cartbox(props) {
  console.log(props.cookies.Sum);
  const totalInCart = props.cookies.Sum;
  const totalInCartObject = JSON.parse(totalInCart);
  console.log(totalInCartObject);

  return (
    <>
      <div>LOGO LOGO</div>
      <div>Total: EUR </div>
      <div>Total Amount of Products: </div>
      <div></div>
    </>
  );
}

Cartbox.getInitialProps = async ctx => {
  console.log(nextCookie(ctx));

  return { cookies: nextCookie(ctx) };
};
