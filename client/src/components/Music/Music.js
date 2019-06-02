import React, { useState, useLayoutEffect } from 'react';
import posed, { PoseGroup } from 'react-pose';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import Paginator from './Paginator';
import Song from './Song';
import Wrapper from './Wrapper';

const Music = React.memo(props => {
  const { musicdata } = props;
  const [search, setSearch] = useState('');
  const [delta, setDelta] = useState(1);
  const [foundData, setFoundData] = useState([]);
  const [songs, setSongs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  const PosedDiv = posed.div({
    enter: {
      opacity: 1,
      transform: 'rotateY(0deg) scaleY(1)',
      transformOrigin: ({ delta }) => (delta === 1 ? 'right' : 'left'),
      filter: 'blur(0px)'
    },
    exit: {
      opacity: 0,
      transform: 'rotateY(45deg) scaleY(1)',
      transformOrigin: ({ delta }) => (delta === 1 ? 'left' : 'right'),
      filter: 'blur(5px)'
    }
  });

  //onScroll()
  const onScroll = e => {
    if (search) {
      if (e.deltaY > 0) {
        setDelta(1);
        if (currentPage + 1 < Math.ceil(foundData.length / 10)) {
          setCurrentPage(currentPage + 1);
        }
      } else {
        setDelta(-1);
        if (currentPage !== 0) setCurrentPage(currentPage - 1);
      }
    } else {
      if (e.deltaY > 0) {
        setDelta(1);
        if (currentPage + 1 < Math.ceil(musicdata.length / 10))
        setCurrentPage(currentPage + 1);
      } else {
        setDelta(-1);
        if (currentPage !== 0) setCurrentPage(currentPage - 1);
      }
    }
  };

  // onSearch()
  const onSearch = e => {
    const input = e.target.value.toLowerCase();
    setSearch(input);
    setCurrentPage(0);

    let _t = musicdata.filter(song => {
      if (
        song.author.toLowerCase().includes(input) ||
        song.title.toLowerCase().includes(input)
      )
        return true;
      return false;
    });

    setFoundData(_t);
  };

  // pull out 10 items out of db
  useLayoutEffect(() => {
    if (search) {
      const songs = foundData.slice(currentPage * 10, currentPage * 10 + 10);
      setSongs(songs);
      setLastPage(Math.ceil(foundData.length / 10));
    } else {
      if (currentPage * 10 < musicdata.length) {
        const songs = musicdata.slice(currentPage * 10, currentPage * 10 + 10);
        setSongs(songs);
        setLastPage(Math.ceil(musicdata.length / 10));
      }
    }
  }, [currentPage, search]);

  return (
    <Wrapper>
      <SearchBar placeholder='Search...' value={search} onChange={onSearch} />
      <MusicList onWheel={onScroll}>
        <PoseGroup>
          {songs.map(song => (
            <PosedDiv key={song.url} delta={delta}>
              <Song key={song.title} song={song} />
            </PosedDiv>
          ))}
        </PoseGroup>
        <Paginator lastPage={lastPage} currentPage={currentPage} />
      </MusicList>
    </Wrapper>
  );
});

export default Music;

const MusicList = styled.div`
  /* background-color: rgba(0,0,0, 0.4); */
  height: calc(100% - 6em);
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  padding: 1em;
  width: 70%;
  color: white;
  perspective: 100vw;
`;
