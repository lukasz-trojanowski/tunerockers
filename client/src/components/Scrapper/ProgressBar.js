import styled from 'styled-components';

const ProgressBar = styled.progress.attrs({ defaultValue: '0', max: '500' })`
  -webkit-appearance: none;
  appearance: none;
  background-color: white;
  height: 2px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;

  ::-webkit-progress-bar {
    background-color: #333;
  }
  
  ::-webkit-progress-value {
    background-color: #ff00ff;
    box-shadow: 0 0 4px 0px purple, 0 0 7px 1px purple, 0 0 18px 0px purple;
  }
`;

export default ProgressBar;