import React from 'react';
import '../css/VideoMenu.css';
import {VideosData} from '../assets/datafiles/VideosData'
import icon from '../assets/image/play.svg'


class VideoMenu extends React.Component{
    render(){
        const styles = {
            fontSize:this.props.fontSize,
            filter:this.props.filter
        }
        
        return(
            <div className="video-menu" style={styles} id="left-display" prevmenu="main-menu">
                
                {VideosData.map((videos,index)=>{
                    return <div className="video-menu-list-item" data="play-video" value="video-playing-menu" key={index}>
                                <img id="icon" width='15px' src={icon} />
                                {videos.tittle}
                            </div>
                })}

            </div>
        )
    }
}

export default VideoMenu;
 
