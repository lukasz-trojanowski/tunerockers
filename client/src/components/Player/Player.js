import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useContext
} from 'react';
import { useSpring } from 'react-spring';
import { withRouter } from 'react-router-dom';
import globalContext from '../../context/context';
import Visualizer from './Visualizer/Visualizer';
import ProgressBar from './ProgressBar';
import StyledWrapper from './StyledWrapper';
import Info from './Info';
import Control from './Control';

function Player(props) {
  const seekBarRef = useRef();
  const audioRef = useRef();
  const { globalState } = useContext(globalContext);
  const { pathname } = props.location;
  const { song } = props;
  const [freqData, setFreqData] = useState([]);
  const [status, setStatus] = useState(0);
  const [style, setStyle] = useSpring(() => ({
    transform: 'translateY(0px) scale(1)'
  }));

  const onControlClick = useCallback(() => {
    setStatus(!status);
  }, [status]);

  const onProgress = () => {
    const { currentTime, duration } = audioRef.current;
    seekBarRef.current.max = duration;
    seekBarRef.current.value = currentTime;
  };

  const onSeek = () => {
    audioRef.current.currentTime = seekBarRef.current.value;
  };

  useEffect(() => {
    if (globalState.isParsing === true)
      setStyle(() => ({ transform: 'translateY(-70px) scale(0.7)' }));
    else setStyle(() => ({ transform: 'translateY(0px) scale(1)' }));
  });

  useEffect(() => {
    let raf = null;
    if (audioRef.current) {
      const ctx = new AudioContext();
      const track = ctx.createMediaElementSource(audioRef.current);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      const bufferLength = analyser.frequencyBinCount;
      const freqDataArray = new Uint8Array(bufferLength);
      track.connect(analyser).connect(ctx.destination);
      const getFreqData = () => {
        analyser.getByteFrequencyData(freqDataArray);
        setFreqData([...freqDataArray]);
        requestAnimationFrame(getFreqData);
      };
      raf = requestAnimationFrame(getFreqData);

      return () => {
        track.disconnect();
        cancelAnimationFrame(raf);
      };
    }
  }, [audioRef.current]);

  useLayoutEffect(() => {
    if (status && audioRef.current) {
      audioRef.current.play();
    } else if (!status && audioRef.current) {
      audioRef.current.pause();
    }
  }, [status]);

  return (
    pathname === '/' ||
    song === '' || (
      <StyledWrapper style={style}>
        <Control onClick={onControlClick} status={status} />
        <ProgressBar ref={seekBarRef} onInput={onSeek} />
        <Info>
          {song.author} - {song.title}
        </Info>
        <Visualizer freqData={freqData} />
        <audio
          crossOrigin='anonymous'
          autoPlay
          preload='auto'
          ref={audioRef}
          src={song.url}
          onTimeUpdate={onProgress}
          onPlaying={() => setStatus(1)}
          onEnded={() => setStatus(0)}
        />
      </StyledWrapper>
    )
  );
}

export default withRouter(Player);
