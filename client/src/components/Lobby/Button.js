import styled from 'styled-components';

const Button = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: ${({ success, warning, background }) => {
    if (success) return 'rgb(53, 99, 50)';
    if (warning) return 'rgb(154, 61, 61)';
    if (background) return background;
    return '#222';
  }};
  width: 20rem;
  text-align: center;
  cursor: pointer;
`;

export default Button;
