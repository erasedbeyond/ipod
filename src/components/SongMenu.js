import React from 'react';
import '../css/SongMenu.css';

class SongMenu extends React.Component{
    render(){
        const styles = {
            fontSize:this.props.fontSize,
            filter:this.props.filter
        }
   
        return(
            <div className="song-menu" style={styles} id="left-display" prevmenu="main-menu">
                <div className="song-menu-list-item" value="now-playing-menu">Now Playing</div>
                <div className="song-menu-list-item" value="all-songs-menu">All Songs</div>
                <div className="song-menu-list-item" value="artists-menu" data="artist">Artists</div>
                <div className="song-menu-list-item" value="albums-menu" data="album">Albums</div>
                <div className="song-menu-list-item" value="song-setting-menu">Settings</div>

                
            </div>
        )
    }
}

export default SongMenu;
