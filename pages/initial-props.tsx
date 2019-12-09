import { NextPage } from 'next';
import Link from 'next/link';
// import Layout from '../components/Layout';
import fetch from 'cross-fetch';
import styled from 'styled-components';

type Props = {
  data: {
    rows: Array<{
      id: Number;
      productname: String;
      price: Number;
      img: String;
      key: Number;
    }>;
  };
};

// <p>{console.log(data.rows) || ''}</p>

const WithInitialProps: NextPage<Props> = ({ data }) => {
  console.log(data.rows);
  const productObject = data.rows.map(product => (
    <li key="id">
      {product.id} - {product.productname} - {product.price}
    </li>
  ));
  return (
    <>
      <h1>List Example (as Function Component)</h1>

      <p>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </p>
      <p>NASE! NASE! </p>
      <ul>{productObject}</ul>
      <div style={{ wordBreak: 'break-all' }}>{JSON.stringify(data)}</div>
    </>
  );
};

WithInitialProps.getInitialProps = async ({ query }) => {
  const response = await fetch(
    process.env.HOSTAPI || `http://localhost:3000/api`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }
  );

  const data = await response.json();

  return { data };
};

export default WithInitialProps;
