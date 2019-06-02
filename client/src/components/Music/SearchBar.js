import React from 'react'
import styled from 'styled-components'

const Search = React.memo((props) => 
  <SearchContainer>
    <SearchBar {...props}/>
  </SearchContainer>
)

export default Search;

const SearchContainer = styled.div`
  color: white;
  display: grid;
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 1em;
  margin-bottom: 1em;
  margin-top: 1em;
  font-size: 2em;
`;

const SearchBar = styled.input`
  background-color: rgba(0, 0, 0, 0.1);
  color: white;
  padding: 1em;
  font-family: 'Prototype';
  display: block;
  border: 1px #333 solid;
  width: 70%;
  transition: 0.3s ease;
  outline: none;
  
  ::placeholder {
    color: white;
  }
  
  :active, :focus {
    outline: none;
    background-color: rgba(0, 0, 0, 0.4);
  }
`;
