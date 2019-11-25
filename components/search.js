import React, { useState, Component } from 'react';
import styled from 'styled-components';
import getAllProducts from '../data';

const SearchContainer = styled.div`
  margin-left: 15px;
`;

const Input = styled.input`
  font-size: 14px;
  text-align: center;
  background-color: #fbf1e8;
  padding: 6px 5px 5px 5px;
  margin: 10px 0px 8px 0px;
  border-radius: 10px 0 0 10px;
  border: none;
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.38);
`;

const Button = styled.button`
  font-size: 14px;
  text-align: center;
  background-color: aliceblue;
  padding: 6px 5px 5px 5px;
  margin: 10px 0px 8px 0px;
  border-radius: 0 10px 10px 0;
  border: none;
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.38);
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
        <form action="/results">
          <Input
            name="results"
            placeholder="Nach Produkt suchen"
            value={searchValue}
            onChange={handleSearchInputChanges}
          />

          <Button>Suche</Button>
        </form>
      </div>
    </SearchContainer>
  );
};

export default Search;
