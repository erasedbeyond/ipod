import React from 'react';
import '../css/AllSongs.css';
import {SongsData} from '../assets/datafiles/SongsData'
import icon from '../assets/image/playIcon.svg'


class AllSongs extends React.Component{
    render(){
        const styles = {
            fontSize:this.props.fontSize,
            filter:this.props.filter
        }
        
        return(
            <div className="all-songs-menu" style={styles} id="left-display" prevmenu="song-menu">
                {SongsData.map((songs,index)=>{
                    return <div className="all-songs-menu-list-item" data="play-song" value="now-playing-menu" key={index}>
                                <img id="icon" src={icon} />
                                {songs.Tittle}
                            </div>
                })}
            </div>
        )
    }
}

export default AllSongs;
 
