import React from 'react'

import styled from 'styled-components';

const H1 = styled.h1`
  left: calc(50% - 2rem);
  top: calc(50% + 1rem);
  font-size: 1rem;
  position: absolute;
`;

const LoadingOld = styled.div`
  margin: auto auto;
  width: 20em;
  height: 20em;
  border: 4px solid white;
  border-bottom: 4px solid #555;
  border-radius: 50%;
  box-shadow: 0 0 7px 1px #00f1ff, 0 0 28px 1px #00f1ff,  0 0 38px 3px white,0 0 4px 1px white, 0 0 55px 20px #00f1ff inset;
  animation: loading 0.9s linear infinite;

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingAlternative = styled.div`
  position: relative;
  display: block;
  margin: auto auto;
  width: 5px;
  height: 5px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 7px 1px #00f1ff, 0 0 18px 0px #00f1ff,  0 0 38px 3px white, 0 14px 18px -3px white, 0 14px 47px 0px #00f1ff, 0 0px 125px 15px #00f1ff;
  animation: .6s 0.2s pulse infinite alternate;
  
  ::before, ::after {
    content: '';
    position: absolute;
    display: block;
    width: 5px;
    height: 5px;
    background: white;
    border-radius: 50%;
    transform-origin: 0px 0px;
    box-shadow: 0 0 7px 1px #00f1ff, 0 0 18px 0px #00f1ff,  0 0 38px 3px white, 0 14px 18px -3px white, 0 14px 47px 0px #00f1ff, 0 0px 125px 15px #00f1ff;
  }

  ::before {
    left: -25px;
    animation: .6s pulse-left infinite alternate;

  }

  ::after {
    right: 0px;
    animation: .6s pulse-right infinite alternate;
  }

  @keyframes pulse-left {
    from {
      left: 0;
    }

    to {
      box-shadow: 0 0 7px 1px #00f1ff, 0 0 18px 0px #00f1ff,  0 0 38px 3px white, 0 14px 18px -3px white, 0 14px 47px 0px #00f1ff, 0 0px 125px 15px #00f1ff;
    }
  }

  @keyframes pulse-right {
    to {
      right: -25px;
      box-shadow: 0 0 7px 1px #00f1ff, 0 0 18px 0px #00f1ff,  0 0 38px 3px white, 0 14px 18px -3px white, 0 14px 47px 0px #00f1ff, 0 0px 125px 15px #00f1ff;
    }
  }
  `;

const Loading = () => {
  return (
    <>
      <LoadingAlternative/>
      <H1 style={{color: 'white'}}>Please wait...</H1>
    </>
  )
}

export default Loading;