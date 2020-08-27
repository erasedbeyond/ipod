import React from 'react';
import '../css/NotificationBar.css';
import {SongsData} from '../assets/datafiles/SongsData';
import play from '../assets/image/playIcon.svg';
import pause from '../assets/image/pauseIcon.svg';
import battery from '../assets/image/batteryIcon.svg';


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
        if(this.props.isPlaying){
            iconImg = <img id="left-noti-icon" alt="playing" src={play}/>
            songPlaying = <div id="noti-container-song"><div id="song-playing">{song.Tittle}- {song.artist}</div></div>;
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
 
