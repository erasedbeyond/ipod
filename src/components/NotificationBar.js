import React from 'react';
import '../css/NotificationBar.css';
import {SongsData} from '../assets/datafiles/SongsData';
import {VideosData} from '../assets/datafiles/VideosData';

import play from '../assets/image/speaker.svg';
import mute from '../assets/image/mute.svg';
import pause from '../assets/image/pauseIcon.svg';
import battery from '../assets/image/batteryIcon.svg';
import low from '../assets/image/low.svg'
import medium from '../assets/image/medium.svg'
import full from '../assets/image/full.svg'


class NotificationBar extends React.Component{


    constructor(){
        super();
        this.state = {
          
            hours: new Date().getHours(),
            minutes: new Date().getMinutes()

        }
    }

    componentDidMount(){

        //updating time every 60secs
        setInterval(()=>{this.setState({
                hours:new Date().getHours(),
                minutes:new Date().getMinutes(),
            })
        },60000);
    }
    render(){

        //time setup
        
        var hr = this.state.hours;
        var min=this.state.minutes;
        var ampm = hr>=12? 'pm':'am';
        hr= hr%12;
        hr= hr? hr:12;
        min = min<10? '0'+min:min;
        
        var song=SongsData[this.props.index];
        var songPlaying;
        var iconImg;

        let volume="";

        if(this.props.volume>0.8){
            volume=full;
        }else if(this.props.volume>0.55){
            volume=medium;
        }else if(this.props.volume>0.25){
            volume=low;
        }


        if(this.props.isPlaying||this.props.isVideoPlaying){
            
             if(this.props.volume<0.05){
                iconImg = <div id="left-icon-div">
                    <img id="left-noti-icon" alt="playing" src={mute}/>
                    <img id="volume-icon" src={volume}/>
                </div>

            }else{
                iconImg = <div id="left-icon-div">
                            <img id="left-noti-icon" alt="playing" src={play}/>
                            <img id="volume-icon" src={volume}/>
                        </div>
            }
    
                if(this.props.isPlaying){
                    songPlaying = <div id="noti-container-song"><div id="song-playing">{song.Tittle}- {song.artist}</div></div>;
                }
                else if(this.props.isVideoPlaying){
                    songPlaying = <div id="noti-container-song"><div id="song-playing">{VideosData[this.props.videoIndex].tittle}</div></div>;
                }
            }else{
                iconImg = <img id="left-noti-icon" alt="paused" src={pause}/>
                songPlaying = <div id='time'>{hr}:{min} {ampm}</div>;
            }
       
        return(
            <div className="notification-bar">
                
                {iconImg}
                
                {songPlaying}
                <img id="battery-icon" alt="battery" src={battery}/>
                
                
            </div>
        )
    }
}

export default NotificationBar;
 
