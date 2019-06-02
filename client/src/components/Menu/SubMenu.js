import React from 'react'
import { useSpring, animated } from 'react-spring';
import { Route } from 'react-router-dom';
import styled from 'styled-components'

export default function SubMenu(props) {
  const { label, to } = props;

  const [submenuStyle, setSubmenuStyle] = useSpring(() => ({
    width: '250px',
    opacity: 0,
    display: 'none',
    backgroundColor: 'black',
    position: 'absolute',
    left: '-50px',
    top: '3.33em',
  }))

  const [glowStyle, setGLowStyle] = useSpring(() => ({
    position: 'relative',
    zIndex: '2',
    display: 'block',
    borderRadius: '2px',
    margin: '0 auto',
    height: '2px',
    background: 'black',
    boxShadow: '0 0 0px 0px #000, 0 0 0px 0px #000,  0 0 0px 0px #000',
  }));

  return (
    <Route path={to}
      children={({ match }) => {
        match 
          ? setGLowStyle({ boxShadow: '0 0 7px 1px #00f1ff, 0 0 18px 0px #00f1ff,  0 0 38px 3px white', background: 'white', immediate: true, })
          : setGLowStyle({ boxShadow: '0 0 0px 0px #000, 0 0 0px 0px #000,  0 0 0px 0px #000', background: 'black', immediate: true });
          
        return (
          <Label
            onMouseOver={() => {
              setSubmenuStyle({ opacity: 1, display: 'block' });
              setGLowStyle({ boxShadow: '0 0 7px 1px #00f1ff, 0 0 18px 0px #00f1ff,  0 0 38px 3px white', background: 'white' });
            }}
            onMouseLeave={() => {
              setSubmenuStyle({ opacity: 0, display: 'none' });
              match || setGLowStyle({ boxShadow: '0 0 0px 0px #000, 0 0 0px 0px #000,  0 0 0px 0px #000', background: 'black' });
            }}
          >
            {label}
            <animated.div style={glowStyle} />
            <animated.div style={submenuStyle}>
              {props.children}
            </animated.div>
          </Label>)
      }
      }
    />
  )
}

const Label = styled.div`
  display: inline-block;
  text-transform: uppercase;
  cursor: pointer;
  width: 150px;
  text-decoration: none;
  color: #ccc;
  padding: 1em 1em;
  transition: 0.2s;
  text-align: center;
  position: relative;
  color: white;
  mix-blend-mode:screen;
`;