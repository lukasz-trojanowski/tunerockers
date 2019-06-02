import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  width: 100vw;
  position: absolute;
  left: 0;
  bottom: 100px;
  justify-content: center;
  align-items: flex-end;
  z-index: -15;

  canvas {
    width: 70vw;
    margin: 0 auto;
    filter: 
      drop-shadow(0px 0px 10px white)
      drop-shadow(0px 0px 3px white)
      drop-shadow(0px 0px 5px purple)
      drop-shadow(0px 0px 5px purple)
      drop-shadow(0px 0px 20px purple)
      drop-shadow(0px 0px 50px purple)
      drop-shadow(0px 0px 180px purple)
      brightness(1.2);
      position: relative;

}
`;

export default StyledWrapper;