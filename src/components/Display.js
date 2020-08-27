import React from 'react';
import '../css/Display.css'
import NotificationBar from './NotificationBar'
import LockMenu from './LockMenu';
import MainMenu from './MainMenu';
import NowPlaying from './NowPlayingMenu'
import SongMenu from './SongMenu';
import VideoMenu from './VideoMenu';
import VideoPlayingMenu from './VideoPlayingMenu';

import GameMenu from './GameMenu';
import SettingMenu from './SettingMenu';
import ThemeMenu from './ThemeMenu'
import WallpaperMenu from './WallpaperMenu';
import FontSizeMenu from './FontSizeMenu';

import AllSongs from './AllSongs'
import ArtistsOrAlbumsMenu from './ArtistsOrAlbumsMenu'
import ArtistOrAlbumSongsMenu from './ArtistOrAlbumSongsMenu'
import SongSettingMenu from './SongSettingMenu';




import {wallpaper} from '../assets/datafiles/WallpaperData'




class Display extends React.Component{
    render(){

        

        //setting up the wallpaper
        var menu =this.props.currentMenu;
        var i = this.props.wallpaperIndex;
        const styles = {
            mainmenu:{
                backgroundImage:' url('+wallpaper[i]+')'
            },
            notificationBar:{
                backgroundColor:this.props.notificationBarColor
            },
            display:{
                filter:this.props.filter
            }
        }

        //setting up right display for extra information
        let rightDisplay;
        if(this.props.showRightDisplay){
            const className= this.props.currentMenu+"-icon"
            const src = this.props.rightDisplayData.src;
            const info =this.props.rightDisplayData.info;
            rightDisplay=  <div id="right-display" >
                                <div id="right-detail">
                                    <div id="right-image"><img className={className} style={styles.display} src={src} /></div>
                                    <div id="right-info">{info}</div>
                                </div>
                            </div>
        }

        return (
            <div className="display" style={styles.mainmenu}>

                <NotificationBar style={styles.notificationBar} index={this.props.index} isPlaying={this.props.isPlaying}/>

                <div id="display">
                    <div id="left-display-container">
                        {!menu.localeCompare('lock-menu')  && <LockMenu />} 
                        {!menu.localeCompare('now-playing-menu' )&&  <NowPlaying progressBarColor={this.props.progressBarColor} backgroundColor={this.props.notificationBarColor} index={this.props.index} audio={this.props.audio}/>}   
                        {!menu.localeCompare('main-menu')  && <MainMenu fontSize={this.props.fontSize} filter={this.props.filter} />} 
                        {!menu.localeCompare('song-menu') && <SongMenu fontSize={this.props.fontSize} filter={this.props.filter} />}  
                        {!menu.localeCompare('video-menu') && <VideoMenu fontSize={this.props.fontSize} filter={this.props.filter}/>}   
                        {!menu.localeCompare('video-playing-menu')  && <VideoPlayingMenu backgroundColor={this.props.progressBarColor} videoIndex={this.props.videoIndex} isVideoPlaying={this.props.isVideoPlaying}/>} 

                        {!menu.localeCompare('game-menu') && <GameMenu  />}   
                        {!menu.localeCompare('setting-menu' )&&  <SettingMenu fontSize={this.props.fontSize} filter={this.props.filter} />}   
                        {!menu.localeCompare('all-songs-menu' )&&  <AllSongs fontSize={this.props.fontSize} filter={this.props.filter}  />}   
                        {(!menu.localeCompare('artists-menu' )||!menu.localeCompare('albums-menu' ))&&  <ArtistsOrAlbumsMenu fontSize={this.props.fontSize} filter={this.props.filter} artistOrAlbum={this.props.artistOrAlbum}  />} 
                        {(!menu.localeCompare('artist-songs-menu' )|| !menu.localeCompare('album-songs-menu' ) ) &&  <ArtistOrAlbumSongsMenu fontSize={this.props.fontSize} filter={this.props.filter} artistOrAlbum={this.props.artistOrAlbum} currentArtistOrAlbum={this.props.currentArtistOrAlbum}/>}   
                        {!menu.localeCompare('song-setting-menu' )&&  <SongSettingMenu fontSize={this.props.fontSize} suffle={this.props.suffle} repeat={this.props.repeat} autoPlay={this.props.autoPlay} filter={this.props.filter} />}   
                        {!menu.localeCompare('wallpaper-menu' )&&  <WallpaperMenu fontSize={this.props.fontSize} filter={this.props.filter} />}  
                        {!menu.localeCompare('font-size-menu' )&&  <FontSizeMenu fontSize={this.props.fontSize} filter={this.props.filter} />}    
                        {!menu.localeCompare('theme-menu')&&<ThemeMenu/>}
                    </div>
                
                    {rightDisplay}
                    
                </div>    
                
            </div>
        );


    }





  
}

export default Display;
