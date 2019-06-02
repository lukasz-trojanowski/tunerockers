import React from 'react'
import styled from 'styled-components';
import { NavLink } from 'react-router-dom'

const Item = styled(({ ...props }) => <NavLink {...props} />)`
  display: inline-block;
  width: 150px;
  text-decoration: none;
  color: #ccc;
  padding: 1em 1em;
  transition: 0.2s;
  text-align: center;
  position: relative;

  :hover {
    color: white;
  }

  :hover::after {
    content: '';
    display: block;
    border-radius: 2px;
    margin: 0 auto;
    height: 2px;
    background: white;
    box-shadow: 0 0 7px 1px #00f1ff, 0 0 18px 0px #00f1ff, 0 0 38px 3px white;
    mix-blend-mode: screen;
    transition: 0.2s;
  }

  :active::after {
    box-shadow: 0 0 7px 1px #00f1ff, 0 0 18px 0px #00f1ff, 0 0 38px 3px white;
  }
`;


export default Item;