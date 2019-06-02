import React, { useContext } from 'react';
import { MdAutorenew } from 'react-icons/md';
import globalContext from '../../context/context';
import StyledWrapper from './StyledWrapper';
import Button from './Button';
import Song from './Song';

function Lobby({ musicdata }) {
  const { dispatch } = useContext(globalContext);

  const parse = () => {
    dispatch({ type: 'START_SCRAPPER' });
  };

  if (musicdata.length === 0)
    return (
      <>
        <Song song={musicdata[0]}/>
      </>
    );
  else
    return (
      <StyledWrapper>
        <h1>There are no songs in the lobby.</h1>
        <h1>Do u want to update database?</h1>
        <Button onClick={parse}>
          <MdAutorenew
            style={{
              fontSize: '1.5rem',
              position: 'absolute',
              left: '25%'
            }}
          />
          Update database
        </Button>
      </StyledWrapper>
    );
}

export default Lobby;
