import React from "react";

function Song({ currentSong, libraryStatus }) {
  return (
    <div className={`song-container ${libraryStatus ? "library-active-song-container" : ""}`}>
      <img src={currentSong.cover} style={{filter: `drop-shadow(0 0 45px ${currentSong.color[0]})`}} alt={currentSong.name}></img>
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
}

export default Song;
