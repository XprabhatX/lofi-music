import React from "react";

function LibrarySong({
  song,
  songs,
  setCurrentSong,
  id,
  audioRef,
  isPlaying,
  setSongs,
}) {
  const selectSongHandler = async () => {
    const selectedSong = songs.filter((state) => state.id === id);
    setCurrentSong(selectedSong[0]);
    //active state
    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
    //check if song is playing
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then((audio) => {
          audioRef.current.play();
        });
      }
    }
    audioRef.current.play();

    // await setCurrentSong(song);
    // const newSongs = songs.map((song) => {
    //   if (song.id === id) {
    //     return {
    //       ...song,
    //       active: true,
    //     };
    //   } else {
    //     return {
    //       ...song,
    //       active: false,
    //     };
    //   }
    // });
  };

  return (
    <div
      className={`library-song ${song.active ? "selected" : ""}`}
      onClick={selectSongHandler}
    >
      <img className="cover-img" src={song.cover} alt={song.name}></img>
      <div className="song-description">
        <img src="https://iili.io/H8mPHDN.gif" alt="playing" />
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
}

export default LibrarySong;
