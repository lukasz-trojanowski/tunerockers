import React from 'react'
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const SubMenuItem = styled((props) => <NavLink {...props}></NavLink>)`
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
  
  ::after {
    content: '';
    display: block;
    border-radius: 2px;
    margin: 0 auto;
    min-height: 4px;
    width: 10px;
    box-shadow: 0 0 0px 0px #000, 0 0 0px 0px #000,  0 0 0px 0px #000;
    top: 1.67em;
    left: 20%;
    position: absolute;
    transition: 0.2s;
    opacity: 0;
  }

  :hover::after {
    background: white;
    box-shadow: 0 0 7px 1px #00f1ff, 0 0 18px 0px #00f1ff,  0 0 38px 3px white;
    opacity: 1;
  }
  
  ::before {
    content: '';
    display: block;
    border-radius: 2px;
    margin: 0 auto;
    min-height: 4px;
    width: 10px;
    box-shadow: 0 0 0px 0px #000, 0 0 0px 0px #000,  0 0 0px 0px #000;
    top: 1.67em;
    right: 20%;
    position: absolute;
    transition: 0.2s;
    opacity: 0;
  }

  :hover::before {
    background: white;
    box-shadow: 0 0 7px 1px #00f1ff, 0 0 18px 0px #00f1ff,  0 0 38px 3px white;
    opacity: 1;
  }

  :active::after {
    box-shadow: 0 0 7px 1px #00f1ff, 0 0 18px 1px #00f1ff,  0 0 38px 3px white !important;
  }

`;

export default SubMenuItem;