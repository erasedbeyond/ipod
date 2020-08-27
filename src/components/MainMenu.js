import React from 'react';
import '../css/MainMenu.css';

class MainMenu extends React.Component{
    render(){

        const styles = {
            fontSize:this.props.fontSize,
            filter:this.props.filter
        }

        return (
            <div className="main-menu" style={styles} id="left-display" prevmenu="lock-menu">
                <div className="main-menu-list-item" value="now-playing-menu">Music Player</div>
                <div className="main-menu-list-item" value="song-menu">Songs</div>
                <div className="main-menu-list-item" value="video-menu">Videos</div>
                <div className="main-menu-list-item" value="game-menu">Games</div>
                <div className="main-menu-list-item" value="setting-menu">Settings</div>
            </div>
        );


            
    }
    
  



  
}

export default MainMenu;

