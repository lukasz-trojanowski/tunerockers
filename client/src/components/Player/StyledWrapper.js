import styled from 'styled-components';
import { animated } from 'react-spring';

const StyledWrapper = styled(animated.div)`
  padding: .6em 2em;
  /* margin-bottom: 1rem; */
  color: white;
  font-size: 2em;
  display: flex;
  flex-flow: column;
  position: absolute;
  bottom: 0;
  width: 100vw;
  `;

export default StyledWrapper;