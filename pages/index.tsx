import React, { useState, Component } from 'react';
import fetch from 'cross-fetch';
import styled from 'styled-components';

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

const HR = styled.hr`
  margin: 20px 40px 20px 20px;
  border-top: 3px dotted #523924;
`;

const H3 = styled.h3`
  margin-bottom: 0px;
`;

const Main = styled.div`
  margin-top: 30px;
  margin-left: 30px;
`;

const Next = styled.button`
  background-color: #000;
  border: 4px solid #f90;
  color: #f90;
  line-height: 48px;
  margin: 0 10px;
  padding: 0 30px;
  cursor: pointer;
  position: relative;
  outline: 0 none;
  text-align: center;
  vertical-align: top;
  text-decoration: none;
  font-weight: 700;
  border-radius: 7px;
  font-size: 20px;
  float: right;
  right: 150px;
`;

const ListUl = styled.ul`
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
`;

const Select = styled.select`
  padding: 5px;
  border-radius: 10px;
  margin-right: 5px;
  background-color: white;
  font-size: 14px;
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.38);
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

const IMG = styled.img`
  box-shadow: 22px 22px 52px -21px rgba(0, 0, 0, 0.39);
`;

const ProduktLi = styled.li`
  padding: 3px;
  margin: 3px;
`;

const ProductContainer = styled.div`
  margin: 20px;
`;

const NextProducts = styled.div`
  bottom: 0;
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
  }[];
};

const Home = (props: Props) => {
  // console.log(props);
  const [selection, setSelection] = useState('rating');

  const productObject = props.product.map(product => (
    <Productlink href={'/products/' + product.productname}>
      <ProduktLi key="id">
        <br />

        <div>
          <ProductName> {product.productname}</ProductName>
          <div>
            {' '}
            {product.unit} {product.measure} - {product.price} €
          </div>
          <br />
          <IMG src={product.img} width="250px" />
          <p>{product.infoshort}</p>

          <br />
        </div>
      </ProduktLi>
    </Productlink>
  ));

  return (
    <Main>
      <ProductList>
        <style jsx>
          {`
            .hero {
              width: 100%;
              color: #333;
            }
            .title {
              margin: 0;
              width: 100%;
              padding-top: 80px;
              line-height: 1.15;
              font-size: 48px;
            }
            .title,
            .description {
              text-align: center;
            }
            .row {
              max-width: 880px;
              margin: 80px auto 40px;
              display: flex;
              flex-direction: row;
              justify-content: space-around;
            }
            .card {
              padding: 18px 18px 24px;
              width: 220px;
              text-align: left;
              text-decoration: none;
              color: #434343;
              border: 1px solid #9b9b9b;
            }
            .card:hover {
              border-color: #067df7;
            }
            .card h3 {
              margin: 0;
              color: #067df7;
              font-size: 18px;
            }
            .card p {
              margin: 0;
              padding: 12px 0 0;
              font-size: 13px;
              color: #333;
            }
          `}
        </style>
        <div>
          <H1>Top Produkte</H1>
          <div>
            <H3>Gereiht nach: Bewertung</H3>
            <br />
            <Select
              value={selection}
              onChange={e => {
                setSelection(e.target.value);
              }}
            >
              <option value="rating">Bewertung</option>
              <option value="price">Preis</option>
              <option value="id">Anzahl der Bestellungn</option>
            </Select>
            {/* <button>V</button>
            <button>Λ</button> */}
          </div>
          <HR />
          <ProductContainer>
            <ListUl>{productObject}</ListUl>
          </ProductContainer>

          <Next>Weiter ></Next>
        </div>

        <br />
      </ProductList>
    </Main>
  );
};

Home.getInitialProps = async ({ selection }) => {
  // console.log('Products were sorted by: ', selection);
  const response = await fetch(
    `http://localhost:3000/api` || process.env.HOSTAPI,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        rankingNow: selection
      })
    }
  );

  const data = await response.json();

  return { product: data.rows };
};

export default Home;
