import React from 'react';
import '../css/ArtistOrAlbumSongsMenu.css';
import {SongsData} from '../assets/datafiles/SongsData'
import icon from '../assets/image/playIcon.svg'

class ArtistOrAlbumSongsMenu extends React.Component{
    render(){
        const classname1=this.props.artistOrAlbum+"-songs-menu";
        const classname2=this.props.artistOrAlbum+"-songs-menu-list-item";
        const prevmenu=this.props.artistOrAlbum+"s-menu";

        const styles = {
            fontSize:this.props.fontSize,
            filter:this.props.filter
        }
        
        return(
            <div className={classname1} style={styles} id="left-display" prevmenu={prevmenu}>
                {
                    this.props.currentArtistOrAlbum.map((item)=>{
                    return  <div className = {classname2} value="now-playing-menu" data={item}>
                        <img id="icon" src={icon} />
                                {SongsData[parseInt(item)].Tittle}
                            </div>
                    })
                }
            </div>
        )
    }
}

export default ArtistOrAlbumSongsMenu;
 
