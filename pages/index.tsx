import React, { useState, useEffect, useRef } from "react";
import { Progress, Container, Row, Button, Input, Form } from "reactstrap";
import AudioPlayer from "react-h5-audio-player";

// import ReactPlayer from "react-player";

export default function Home() {
  const AudioPisRef = useRef(null);
  const Urls = [
    "https://stm10.xcast.com.br:12264/stream",
    "http://191.37.227.74:5003/stream.aac",
  ];

  const [UrlPlay, setUrlPlay] = useState<string>();
  const [tempoUrl, setTempoUrl] = useState<string>();
  const [onPlay, setOnPlay] = useState(false);
  const [type, setType] = useState<string>();

  useEffect(() => {
    const URLStorage = localStorage.getItem("url");
    if (URLStorage !== null) {
      setUrlPlay(URLStorage);
    } else {
      setUrlPlay(Urls[1]);
    }
  }, []);

  useEffect(() => {
    if (UrlPlay) {
      localStorage.setItem("url", UrlPlay);
    }
  }, [UrlPlay]);

  useEffect(() => {
    console.log(type);
    if (type === "waiting" && onPlay) {
      window.location.reload();
    }
  }, [type, AudioPisRef]);

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Form
        style={{
          width: "100%",
          marginTop: "50px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          justifyContent: "center",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          setUrlPlay(tempoUrl);
          return;
        }}
      >
        <label htmlFor="inputUrl">URL:</label>
        <Input
          id="inputUrl"
          style={{
            padding: "1rem",
            width: "50%",

            borderRadius: "10px",
            marginRight: "10px",
          }}
          value={tempoUrl ? tempoUrl : UrlPlay}
          type="text"
          onChange={(e) => {
            setTempoUrl(e.target.value);
          }}
        ></Input>
        <Button type="submit">Trocar para essa URL</Button>
      </Form>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          style={
            UrlPlay === Urls[0]
              ? {
                  border: "2px solid blue",
                  height: "50px",
                  width: "100px",
                  marginTop: "50px",
                  borderRadius: "10px",
                  marginRight: "10px",
                }
              : {
                  marginTop: "50px",
                  height: "50px",
                  width: "100px",
                  borderRadius: "10px",
                  marginRight: "10px",
                }
          }
          onClick={() => {
            setUrlPlay(Urls[0]);
          }}
        >
          Audio Torre Site
        </Button>
        <Button
          style={
            UrlPlay === Urls[1]
              ? {
                  border: "2px solid blue",
                  height: "50px",
                  width: "100px",
                  marginTop: "50px",
                  borderRadius: "10px",
                  marginRight: "10px",
                }
              : {
                  marginTop: "50px",
                  height: "50px",
                  width: "100px",
                  borderRadius: "10px",
                  marginRight: "10px",
                }
          }
          onClick={() => {
            setUrlPlay(Urls[1]);
          }}
        >
          Audio Torre Local
        </Button>
      </div>

      <div
        style={{
          height: "100vh",
          width: "50%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h1>
            {UrlPlay === Urls[0]
              ? "Audio Site"
              : UrlPlay === Urls[1]
              ? "Audio Studio"
              : "Audio Site"}
          </h1>
        </div>
        <Row>
          {/* <audio ref={AudioPisRef} autoPlay></audio> */}

          {UrlPlay && (
            <AudioPlayer
              onPlayError={(e) => {
                setTimeout(() => {
                  return window.location.reload();
                }, 1000);
              }}
              onWaiting={(e) => setType(e.type)}
              onListen={(e) => setType(e.type)}
              onError={(e) =>
                setTimeout(() => {
                  return window.location.reload();
                }, 1000)
              }
              onChangeCurrentTimeError={() => {
                setTimeout(() => {
                  return window.location.reload();
                }, 1000);
              }}
              onPlaying={() => setOnPlay(true)}
              progressUpdateInterval={1}
              autoPlay
              src={UrlPlay}
              ref={AudioPisRef}
            ></AudioPlayer>
          )}
        </Row>
      </div>
    </Container>
  );
}
