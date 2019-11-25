import React, { useState, Component } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import fetch from 'cross-fetch';

type Props = {
  searchArray: {
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

const Main = styled.div`
  margin-top: 30px;
  margin-left: 30px;
`;

const HR = styled.hr`
  margin: 20px 40px 20px 20px;
  border-top: 3px dotted #523924;
`;

const MainList = styled.div`
  grid-column: 2;
  grid-row: 4;
  align-items: center;
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

const ProduktLi = styled.li`
  padding: 3px;
  margin: 3px;
`;

const H3 = styled.h3`
  margin-bottom: 0px;
`;

const ProductContainer = styled.div`
  margin: 20px;
`;

const Results = (props: Props) => {
  const [selection, setSelection] = useState('rating');
  const router = useRouter();
  if (!props.searchArray) {
    console.log('ERROR product not found');
  }
  ///const searchValue = router.query.q;
  ///console.log(searchValue);

  //const searchArray = allproducts.filter(function(element) {
  //  return element.productname.includes(searchValue);
  //});
  //const allproductsMaped = allproducts.map((product, key) => product.id);

  const mapSearchArray = props.searchArray.map((product, key) => (
    <Productlink href={'/products/' + product.productname}>
      <ProduktLi key={product.id}>
        <br />

        <div>
          <ProductName> {product.productname}</ProductName>
          <div>
            {' '}
            {product.unit} {product.measure} - {product.price} €
          </div>
          <br />
          <img src={product.img} width="250px" />
          <p>{product.infoshort}</p>

          <br />
        </div>
      </ProduktLi>
    </Productlink>
  ));

  return (
    <Main>
      <div>
        <H1>Produkte von Suche</H1>
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
      </div>
      <MainList>
        <ListUl>{mapSearchArray}</ListUl>
      </MainList>

      <br />
      <br />
      <br />
      <HR />
    </Main>
  );
};

export default Results;

Results.getInitialProps = async ({ query }) => {
  console.log(query);
  const response = await fetch(`http://localhost:3000/api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      results: query.results
    })
  });

  const data = await response.json();
  console.log(data.rows);
  return { searchArray: data.rows };
};
