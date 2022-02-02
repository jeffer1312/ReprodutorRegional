import React, { useState, useEffect, useRef } from 'react';
import { Progress, Container, Row } from 'reactstrap';
import AudioPlayer from 'react-h5-audio-player';

// import ReactPlayer from "react-player";

export default function Home() {
  const AudioPisRef = useRef(null);
  const Urls = [
    'http://191.37.227.74:5000/stream.aac',
    'http://192.168.88.110:9000/stream.aac',
  ];

  const [UrlPlay, setUrlPlay] = useState<string>();

  const [onPlay, setOnPlay] = useState(false);
  const [type, setType] = useState<string>();

  useEffect(() => {
    const URLStorage = localStorage.getItem('url');
    if (URLStorage !== null) {
      setUrlPlay(URLStorage);
    } else {
      setUrlPlay(Urls[0]);
    }
  }, []);

  useEffect(() => {
    if (UrlPlay) {
      localStorage.setItem('url', UrlPlay);
    }
  }, [UrlPlay]);

  useEffect(() => {
    if (type === 'waiting' && onPlay) {
      window.location.reload();
    }
  }, [type, AudioPisRef]);

  return (
    <Container
      style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
    >
      <div
        style={{
          height: '100vh',
          width: '50%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <h1>Esta Tocando Torre</h1>
        </div>
        <Row>
          {/* <audio ref={AudioPisRef} autoPlay></audio> */}
          <AudioPlayer
            onPlayError={() => {
              return window.location.reload();
            }}
            onWaiting={e => setType(e.type)}
            onListen={e => setType(e.type)}
            onError={e => console.log(e)}
            loop={true}
            onChangeCurrentTimeError={() => {
              return window.location.reload();
            }}
            onPlaying={() => setOnPlay(true)}
            progressUpdateInterval={1}
            src={UrlPlay}
            ref={AudioPisRef}
          ></AudioPlayer>
        </Row>
      </div>
    </Container>
  );
}
