import React from 'react';
import '../css/SongSettingMenu.css';
import onn from '../assets/image/onn.svg';
import off from '../assets/image/off.svg'


class SongSettingMenu extends React.Component{
    render(){
        const styles = {
            fontSize:this.props.fontSize,
            filter:this.props.filter
        }

        //to show whether auto play is onn or off
        let autoPlayIcon;
        if(this.props.autoPlay){
            autoPlayIcon=onn;
        }else autoPlayIcon=off;

        //to show whether the repeat is on of off
        let repeatIcon;
        if(this.props.repeat){
            repeatIcon=onn;
        }else repeatIcon=off;

        let suffleIcon;
        if(this.props.suffle){
            suffleIcon=onn;
        }else suffleIcon=off;

        
        return(
            <div className="song-setting-menu" style={styles} id="left-display" prevmenu="song-menu">
                <div className="song-setting-menu-list-item" data="suffle">Suffle<img className="icon" src={suffleIcon}/></div>
                <div className="song-setting-menu-list-item" data="repeat">Repeat<img className="icon" src={repeatIcon}/></div>
                <div className="song-setting-menu-list-item" data="auto-play">Auto Play <img className="icon" src={autoPlayIcon}/> </div>


             
                
            </div>
        )
    }
}

export default SongSettingMenu;
