import React, { useState, Component } from 'react';
import styled from 'styled-components';
import getAllProducts from '../data';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Cartbox from './cartbox';
import Nav from './nav';
import Header from './header';

const allproducts = getAllProducts();
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

const SearchContainer = styled.div`
  left: 45%;
  position: fixed;
  top: 170px;
`;

const Search = () => {
  const [searchValue, setSearchValue] = useState([]);

  const handleSearchInputChanges = event => {
    setSearchValue(event.target.value);
  };

  let [count, setCount] = useState(1);

  // const onSubmitHandler = event => {
  //   event.preventDefault();
  //   const linkWithSearch = './results?' + searchValue;
  //   window.location.href = linkWithSearch;
  // };

  return (
    <SearchContainer>
      <div>
        <div>
          <form action="/results">
            <input
              name="results"
              value={searchValue}
              onChange={handleSearchInputChanges}
            />

            <input type="submit" value="Search" />
          </form>
        </div>
        <br />
      </div>

      <br />
    </SearchContainer>
  );
};

export default Search;
