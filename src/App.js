import { useState, useRef, useEffect } from "react";
//Styles
import "./styles/app.scss";
//Components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
//Data
import data from "./data";
import { library } from "@fortawesome/fontawesome-svg-core";

function App() {
  //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    aniamtionPercentage: 0,
  });

  //useEffect

  const [libraryStatus, setLibraryStatus] = useState(false);

  const timeUpdateHandler = (e) => {
    // e.target contains stuff like current time and total duration
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //calc percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const aniamtionPercentage = Math.round(
      (roundedCurrent / roundedDuration) * 100
    );
    // console.log(
    //   aniamtionPercentage !== NaN ? aniamtionPercentage + "%" : "wait"
    // );
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration,
      aniamtionPercentage: aniamtionPercentage,
    });
  };

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  };

  const audioRef = useRef(null);

  return (
    <>
    <div className={`bg-image ${libraryStatus ? "library-active-bg" : ""}`}></div>
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} libraryStatus={libraryStatus} />
      <Player
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setSongs={setSongs}
      />
      <Library
        setCurrentSong={setCurrentSong}
        currentSong={currentSong}
        songs={songs}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>

      <h3 className={`end-credits ${libraryStatus ? "end-credits-hide" : ""}`}>~Prabhat Pankaj</h3>
    </div>
    </>
  );
}

export default App;
