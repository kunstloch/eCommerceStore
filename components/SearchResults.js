import React, { useState, Component } from 'react';
import styled from 'styled-components';
import allproducts from '../data';

const Productlink = styled.a`
  max-width: 150px;

  & * {
    max-width: 150px;
  }

  & *:hover {
    background-color: gray;
    cursor: pointer;
  }
`;

const SearchResults = () => {
  const [searchValue, setSearchValue] = useState([]);
  const [searchArray, setSearchArray] = useState([]);

  const handleSearchInputChanges = event => {
    setSearchValue(event.target.value);
  };

  const resetInputField = () => {
    setSearchValue('');
  };

  const callSearchFunction = event => {
    event.preventDefault();
    setSearchArray(
      allproducts.filter(function(element) {
        return element.productName.includes(searchValue);
      })
    );

    resetInputField();
  };

  let [count, setCount] = useState(1);
  function increment() {
    setCount(count + 1);
  }

  const mapSearchArray = searchArray.map((product, key) => (
    <Productlink>
      <li key={product.id}>
        {product.productName} - {product.unit} {product.measure}
        <br />
        <img src={product.img} width="100px"></img>
        <p>{product.infoShort}</p>
        <br />
      </li>
    </Productlink>
  ));

  return (
    <>
      <div>
        <div>
          <form onSubmit={callSearchFunction}>
            <input value={searchValue} onChange={handleSearchInputChanges} />
          </form>
          <input onClick={callSearchFunction} type="submit" value="Search" />
          <button onClick={increment}>+</button>
          {count}

          <p>{console.log('searchArray ', searchArray)}</p>

          <ul>{mapSearchArray}</ul>
        </div>
      </div>

      <br />
      <br />
      <br />
      <hr />
      <div>Hallo</div>
      <div>{allproducts[1].productName}</div>
      <div>{allproducts[1].img}</div>
      <img src={allproducts[0].img} width="180px" />
    </>
  );
};

export default SearchResults;
