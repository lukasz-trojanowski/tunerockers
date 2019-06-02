import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-flow: column;
  height: 100vh;

  ::after {
    content: '';
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(45deg, #00000000 33.33%, #222222 33.33%, #222222 50%, #00000000 50%, #00000000 83.33%, #222222 83.33%, #222222 100%);
    background-size: 8px 8px;
    z-index: -20;
  }
`;

export default Container;
