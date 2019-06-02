import React from 'react'
import styled from 'styled-components';


const Wrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin: 1rem 2rem;
  color: white;
  font-size: 2em;
`;

const Paginator = ({currentPage, lastPage}) => (
  <Wrapper>
    {lastPage !== 0 && `${currentPage + 1} / ${lastPage} `}
  </Wrapper>
)



export default Paginator;