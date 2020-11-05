import React, { useEffect } from "react";
import { useStateValue } from "./StateProvider";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import "./Footer.css";
import { Grid, Slider } from "@material-ui/core";

function Footer({ spotify }) {
  const [{ token, item, playing }, dispatch] = useStateValue();

  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((r) => {
      console.log(r);

      dispatch({
        type: "SET_PLAYING",
        playing: r.is_playing,
      });

      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
    });
  }, [spotify]);

  const handlePlayPause = () => {
    if (playing) {
      spotify.pause();
      dispatch({
        type: "SET_PLAYING",
        playing: false,
      });
    } else {
      spotify.play();
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    }
  };

  const skipNext = () => {
    spotify.skipToNext();
    spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    });
  };

  const skipPrevious = () => {
    spotify.skipToPrevious();
    spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    });
  };

  return (
    <div className="footer">
      <div className="footer__left">
        <img className="footer__albumLogo" src="data:image/jpeg;base64,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" alt="" />
        {item ? (
          <div className="footer__songInfo">
            <h4>{item.name}</h4>
            <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
          </div>
        ) : (
          <div className="footer__songInfo">
            <h4>Utawezana</h4>
            <p>Femi One ft Mejja</p>
          </div>
        )}
      </div>

      <div className="footer__center">
        <ShuffleIcon className="footer__green" />
        <SkipPreviousIcon onClick={skipNext} className="footer__icon" />
        {playing ? (
          <PauseCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        ) : (
          <PlayCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        )}
        <SkipNextIcon onClick={skipPrevious} className="footer__icon" />
        <RepeatIcon className="footer__green" />
      </div>
      <div className="footer__right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider aria-labelledby="continuous-slider" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;