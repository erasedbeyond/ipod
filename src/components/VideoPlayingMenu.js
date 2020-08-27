import React from 'react';
import '../css/VideoPlayingMenu.css';
import {VideosData} from '../assets/datafiles/VideosData'
import Icon from '../assets/image/play.svg'

class VideoPlayingMenu extends React.Component{
    render(){
    const src = VideosData[this.props.videoIndex].src;
    const tittle = VideosData[this.props.videoIndex].tittle;

    const styles={
        backgroundColor : this.props.backgroundColor
    }

    let icon=<div></div>;
    if(!this.props.isVideoPlaying){
        icon =  <div id="video-play-icon"><img src={Icon}/></div>
    }

        return(
            <div className="video-playing-menu" prevmenu="video-menu">
                <div id="video-tittle"  style={styles}>{tittle}</div>
                {icon}
                <video id="display-video" src={src} type="video/mp4"></video>
           
            </div>
        )
    }
}

export default VideoPlayingMenu;
