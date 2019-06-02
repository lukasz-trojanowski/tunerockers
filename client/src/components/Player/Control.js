import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useTransition, animated } from 'react-spring';

const Control = styled(animated.div)`
  cursor: pointer;
  display: block;
  position: absolute;
  top: 4px;
`;

export default React.memo(({ status, ...props }) => {
  const transitions = useTransition(status, null, {
    config: {
      mass: 1,
      tension: 1000,
      friction: 50
    },
    from: {
      opacity: 0,
      transform: 'translateX(-0%) rotate(90deg)',
      transformOrigin: 'center'
    },
    enter: {
      opacity: 1,
      transform: 'translateX(0%)  rotate(0deg)',
      transformOrigin: 'center'
    },
    leave: {
      opacity: 0,
      transform: 'translateX(-0%)  rotate(-90deg)',
      transformOrigin: 'center'
    }
  });

  return transitions.map(({ item, key, props: style }) => (
    <Control {...props}>
      {item ? (
        <animated.svg
          fill='white'
          width='24'
          height='24'
          style={style}
          key={key}>
          <path d='M10 24h-6v-24h6v24zm10-24h-6v24h6v-24z' />
        </animated.svg>
      ) : (
        <animated.svg
          fill='white'
          width='24'
          height='24'
          style={style}
          key={key}>
          <path d='M2 24v-24l20 12-20 12z' />
        </animated.svg>
      )}
    </Control>
  ));
});
