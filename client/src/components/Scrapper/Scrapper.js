import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { useSpring } from 'react-spring';
import axios from 'axios';
import io from 'socket.io-client';
import ProgressBar from './ProgressBar';
import Logger from './Logger';
import globalContext from '../../context/context';
import CloseIcon from './CloseIcon';

const Scrapper = () => {
  const { globalState, dispatch } = useContext(globalContext);
  const [logMessage, setLogMessage] = useState('Parsing...');
  const [progress, setProgress] = useState(0);

  const [style, toggleVisibility] = useSpring(() => ({
    transform: 'translateY(200px)'
  }));

  useLayoutEffect(() => {
    if (globalState.isParsing)
      toggleVisibility(() => ({ transform: 'translateY(0px)' }));
    else toggleVisibility(() => ({ transform: 'translateY(200px)' }));
  });

  useLayoutEffect(() => {
    let stageLength = 1;
    const socket = io('http://188.127.13.182');
    socket.on('parsing_start', payload => {
      setLogMessage(`Analysing forum threads for:  ${payload.genre}.`);
    });

    socket.on('parsing_threads_start', payload => {
      stageLength = payload.threads;
    });

    socket.on('thread_parsed', payload => {
      setLogMessage(payload.threadurl);
      setProgress(progress => progress + 50 / stageLength);
    });

    socket.on('parsing_zippyshare_start', payload => {
      console.log(payload.urls);
      stageLength = payload.urls;
    });

    socket.on('parsing_zippyshare', payload => {
      setLogMessage(`Downloading from ${payload.url}...`);
      setProgress(progress => progress + 50 / stageLength);
    });

    socket.on('parsing_end', payload => {
      setLogMessage(`Parsing done. Added ${payload.new} new songs to Lobby.`);
      socket.close();
      setProgress(500);

      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      async function fetchDB() {
        let lobbyDB = await axios.get('http://188.127.13.182/api/music/lobby', {
          cancelToken: source.token
        });
        dispatch({ type: 'SET_LOBBY_DATABASE', payload: lobbyDB.data });
      }
      fetchDB();
    });

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (globalState.isParsing)
      axios.post('http://188.127.13.182/api/music/parse');
    setProgress(0);
  }, [globalState.isParsing]);

  return (
    <Logger style={style}>
      <ProgressBar value={progress} />
      <CloseIcon onClick={() => dispatch({ type: 'STOP_SCRAPPER' })}>
        &times;
      </CloseIcon>
      <p>
        {(progress / 5).toFixed(1)}% | {logMessage}
      </p>
    </Logger>
  );
};

export default Scrapper;
