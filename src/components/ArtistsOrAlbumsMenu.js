import React from 'react';
import {SongsData} from '../assets/datafiles/SongsData';
import '../css/ArtistsOrAlbumsMenu.css';
import icon1 from '../assets/image/artist.svg'
import icon2 from '../assets/image/album.svg'

class ArtistsOrAlbumsMenu extends React.Component{


    render(){
       
        const classname1=this.props.artistOrAlbum+"s-menu";
        const className2=this.props.artistOrAlbum+"s-menu-list-item";
        const value=this.props.artistOrAlbum+"-songs-menu";
        let icon;
        let map = new Map();//using map to store data of all artists or albums
        //if artist is mapped
        if(this.props.artistOrAlbum==="artist"){
            SongsData.map((item,index)=>{
                if(map.has(item.artist)){
                   map.get(item.artist).push(index); 
                }else{
                    var arr=[index];
                    map.set(item.artist,arr);
                } 
            });
            icon=icon1;
        }
        // if albums is mapped
        if(this.props.artistOrAlbum==="album"){
            SongsData.map((item,index)=>{
                if(map.has(item.album)){
                   map.get(item.album).push(index); 
                }else{
                    var arr=[index];
                    map.set(item.album,arr);
                } 
            });
            icon=icon2;
        }

        var items=[];                            
        for(let [key , value] of map.entries()){
            items.push({
                name:key,
                index:value
        })}
        
        const styles = {
            fontSize:this.props.fontSize,
            filter:this.props.filter
        }
        
       
        return(
            <div className={classname1} style={styles} id="left-display" prevmenu="song-menu">
              
                {
                
                   items.map((item,index)=>{
                        return <div className={className2} value={value} data={item.index}>
                                    <img id="icon" src={icon} />
                                    {item.name}
                                </div>
                   })
                }
            </div>
        )
    }
}

export default ArtistsOrAlbumsMenu;
