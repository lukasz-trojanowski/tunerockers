import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { MdClear, MdCheck, MdPlayArrow } from 'react-icons/md';
import GlobalContext from '../../context/context';
import Button from './Button';

export default function({ song }) {
  const { url } = song;
  const { globalState, dispatch } = useContext(GlobalContext);
  const [author, setAuthor] = useState(song.author);
  const [title, setTitle] = useState(song.title);

  useEffect(() => {
    setAuthor(song.author);
    setTitle(song.title);
    dispatch({
      type: 'SET_CURRENT_SONG',
      payload: { url, author: song.author, title: song.title }
    });
  }, [song]);

  const buttonStyle = {
    margin: '0 1rem',
    width: '30px',
    height: '30px',
    justifySelf: 'flex-end'
  };

  const setCurrentSong = () => {
    dispatch({ type: 'SET_CURRENT_SONG', payload: { url, author, title } });
    console.log(globalState);
  };

  const acceptSong = async id => {
    const response = await axios.patch(
      `http://188.127.13.182/api/music/songs/${id}`,
      { author, title }
    );

    let musicDB = await axios.get('http://188.127.13.182/api/music/songs');
    dispatch({ type: 'SET_MUSIC_DATABASE', payload: musicDB.data });

    if (!response.data.error) {
      dispatch({ type: 'REMOVE_FROM_LOBBY', payload: song._id });
    }
  };

  const discardSong = async id => {
    const response = await axios.delete(
      `http://188.127.13.182/api/music/songs/${id}`
    );
    if (!response.data.error) {
      dispatch({ type: 'REMOVE_FROM_LOBBY', payload: song._id });
    }
  };

  return (
    <Song>
      <Details>
        <div>
          <Input value={author} onChange={e => setAuthor(e.target.value)} />
        </div>
      </Details>
      <Details>
        <div>
          <Input value={title} onChange={e => setTitle(e.target.value)} />
        </div>
      </Details>
      <Details>
        <div>
          <Button
            background={'#333'}
            style={buttonStyle}
            onClick={setCurrentSong}>
            <MdPlayArrow style={{ color: 'rgb(24, 187, 199)' }} />
          </Button>

          <Button
            background={'#333'}
            style={buttonStyle}
            onClick={() => window.open(`${song.threadlink}`, '_blank')}>
            4Clubbers
          </Button>
          <Button
            success
            style={buttonStyle}
            onClick={() => acceptSong(song._id)}>
            <MdCheck /> Accept
          </Button>
          <Button
            warning
            style={buttonStyle}
            onClick={() => discardSong(song._id)}>
            <MdClear /> Remove
          </Button>
        </div>
      </Details>
    </Song>
  );
}

/*
|--------------------------------------------------------------------------
| STYLED-COMPONENTS
|--------------------------------------------------------------------------
*/

const Song = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 70%;
  background-color: #222;
  color: white;
  margin: 1rem auto;
  padding: 2rem 4rem;
`;

const Control = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  & svg {
    filter: drop-shadow(0 0 7px #00f1ff) drop-shadow(0 0 2px #00f1ff)
      drop-shadow(0 0 18px #00f1ff) drop-shadow(0 0 28px white);
  }
`;

const Details = styled.div`
  /* border: 1px #444 dashed; */
  padding: 16px;
  display: flex;
  flex-flow: column wrap;
  flex: 0 1 100%;

  div {
    display: flex;
    flex-grow: 1;
    flex-flow: row;
    padding: 8px;
  }
`;

const Input = styled.input.attrs({ type: 'text' })`
  font-family: 'Khand';
  display: block;
  border: none;
  border-bottom: 1px solid #444;
  background: none;
  outline: none;
  margin-left: 10px;
  font-size: 1.5rem;
  color: white;
  width: 100%;

  :focus {
    outline: none;
    border-bottom: 1px solid white;
  }
`;
