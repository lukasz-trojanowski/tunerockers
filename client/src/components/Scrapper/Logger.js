import styled from 'styled-components';
import { animated } from 'react-spring';

const Logger = styled(animated.div)`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  padding: 0 1rem;
  width: 100vw;
  height: 4rem;
  background: #222;
  border: 1px solid black;
  color: white;
`;

export default Logger;