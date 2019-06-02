import React, { useReducer, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import axios from 'axios';
import Loading from './Loading'
import Container from './Container/Container'
import Menu from './Menu/Menu'
import Welcome from './Welcome/Welcome'
import Music from './Music/Music'
import Lobby from './Lobby/Lobby'
import Player from './Player/Player'
import Scrapper from './Scrapper/Scrapper'
import GlobalContext from '../context/context'
import globalReducer from '../reducer/reducer'

import './App.css';

function App() {
  const [globalState, dispatch] = useReducer(globalReducer, { currentSong: '', database: [], lobbyDatabase: [], isParsing: false })
  const [isLoading, setIsLoading] = useState(1);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    async function fetchDB() {
      let musicDB = await axios.get('http://188.127.13.182/api/music/songs', { cancelToken: source.token });
      let lobbyDB = await axios.get('http://188.127.13.182/api/music/lobby', { cancelToken: source.token });
      dispatch({ type: 'SET_MUSIC_DATABASE', payload: musicDB.data });
      dispatch({ type: 'SET_LOBBY_DATABASE', payload: lobbyDB.data });
      setIsLoading(false);
    }; fetchDB();

    return () => {
      source.cancel('Axios request cancelled.');
    }
  }, []);

  if (!isLoading) {
    return (
      <GlobalContext.Provider value={{ globalState, dispatch }}>
        <Container >
          <Router>
            <Menu />
            <Switch>
              <Route key='home' exact path='/' render={() => <Welcome />} />
              <Route key='lobby' exact path='/lobby' render={() => <Lobby musicdata={globalState.lobbyDatabase} />} />
              {
                globalState.database.map((genre) =>
                  genre.songs.map((year) =>
                    <Route exact key={`${genre._id}${year.year}`} path={'/' + genre._id + '/' + year.year} render={(props) => <Music musicdata={year.songs} {...props} />} />
                  ))
              }
            </Switch>
            <Player song={globalState.currentSong} />
            <Scrapper/>
          </Router>
        </Container>
      </GlobalContext.Provider>
    );
  } else {
    return (
      <Container>
        <Loading />
      </Container>
    )
  }
}

export default hot(App);