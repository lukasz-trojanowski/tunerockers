import styled from 'styled-components';

const ProgressBar = styled.input.attrs({ type: 'range', min: '0', max: '100', step: 0.1, defaultValue: 0 })`
  -webkit-appearance: none;
  cursor: pointer;
  display: block;
  width: 95%;
  margin: 0 4em;
  background: none;
  outline: none;
  padding: 5px 0;

  :focus {
    outline: none;
  }

  ::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    background: white;
    border: none;
    border-radius: 2px;
  }

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    cursor: pointer;
    margin-top: -20px;
    width: 36px;
    height: 12px;
    background: #fff;
    border: 0px solid #000000;
    border-radius: 5px;
}
`;

export default ProgressBar;