import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import styled from 'styled-components';

import GlobalContext from '../../context/context';

export default function({style, ...props}) {
  const { author, title, url } = props.song;
  const { dispatch } = useContext(GlobalContext);
  const [isVisible, setIsVisible] = useState(true);

  useLayoutEffect(() => {
    return () => {
      setIsVisible(false);
    };
  }, []);



  const setCurrentSong = () => {
    dispatch({ type: 'SET_CURRENT_SONG', payload: { url, author, title } });
  };

  return (
    <Song onClick={setCurrentSong} style={style}>
      {/* <Point /> */}
      <Details>
        <Author>{author}</Author>
        <Title>{title}</Title>
      </Details>
    </Song>
  );
}

const Title = styled.div`
  font-size: 1rem;
  margin-left: 1rem;
  border-bottom: 1px #333 solid;
  transition: border 0.1s;
`;

const Song = styled(animated.div)`
  cursor: pointer;
  /* position: absolute; */
  /* height: 100px; */
  display: flex;
  padding: 0.2em;
  color: #ccc;
  width: 100%;

  :hover {
    /* background: rgba(0,0,0,0.2); */
    /* transform: translateX(5px); */
    color: #fff;
  }

  :hover ${Title} {
    border-bottom: 1px purple solid;
  }
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 1.5rem;
`;

const Author = styled.div`
  width: 50%;
  text-align: right;
`;
