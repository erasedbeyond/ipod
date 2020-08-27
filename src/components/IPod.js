import React from 'react';
import Buttons from './buttons';
import Display from './Display';


import '../css/IPod.css';
import unlock from '../assets/sounds/unlock.mp3'
import click from '../assets/sounds/click.mp3'

import {SongsData} from '../assets/datafiles/SongsData';
import {VideosData} from '../assets/datafiles/VideosData';

import {MainMenuData} from '../assets/datafiles/MainMenuData'
import {SongsMenuData} from '../assets/datafiles/SongsMenuData'
import {SettingMenuData} from '../assets/datafiles/SettingMenuData'
import {SongSettingMenuData} from '../assets/datafiles/SongSettingMenuData'

import {wallpaper} from '../assets/datafiles/WallpaperData'
import theme from '../assets/image/icon/colorIcon.svg'


import Song from '../assets/songs/song1.mp3';



class IPod extends React.Component {
    constructor(){
        super();
        
        
        this.state={

            //for display menu
            activeMenuClass:'lock-menu-list-item',
            activeMenu:'lock-menu',

            //for audio
            currentAudio: new Audio(Song),
            audioIndex:0,
            isPlaying:false,

            //video index
            videoIndex:0,
            isVideoPlaying:true,

            //for album or artist
            artistOrAlbum:"",
            currentArtistOrAlbum:[],

            //for wallpaper
            wallpaperIndex:0,

            //for right side display
            showRightDisplay:false,
            rightDisplayMenu:MainMenuData,
            rightDisplayData:MainMenuData[0],

            //for theme
            progressBarColor:'hsla(192,50.2%,52.0%,0.4)',
            notificationBarColor:'hsla(192,50.2%,52.0%,0.8)',
            filter:'hue-rotate(0deg)',

            //song-setting
            autoPlay:true,
            repeat:false,
            suffle:false,

            //font zise
            fontSize:"0.7rem",

            //volume
            audioVolume:1.0,
            videoVolume:1.0


           
        }
        this.skip=1;
        this.angle=-1;
        this.j=0;//prev index to be selected of menu list item
        this.i=0;//next index to be selected of menu list item
        this.audio=new Audio(SongsData[0].src);

        this.unlock = new Audio(unlock);
        this.click = new Audio(click);

        this.color=1;
        this.hue=192;
        this.volume=0.01;


    }

    componentDidMount(){
        //setting up what will happen when current song has ended
        console.log(SongsData[this.state.audioIndex].src, ' **url');
        setInterval (() => {

            if(this.state.currentAudio.duration==this.state.currentAudio.currentTime){
                if(this.state.autoPlay){

                    //if repeat is off play the next song else play current song 
                    if(!this.state.repeat){ 

                        //if suffle is onn then setting random song else next audio plays
                        if(this.state.suffle){

                            var index = Math.floor(Math.random() * SongsData.length);    
                            this.setState({audioIndex:index});                        

                        }else{

                            if(this.state.audioIndex<SongsData.length-1){
                                this.setState({audioIndex:this.state.audioIndex+1});
                            }else this.setState({audioIndex:0});
                        }
                        this.setState({currentAudio: new Audio(SongsData[this.state.audioIndex].src)});

                     
                    }

                    this.state.currentAudio.play();
                }else this.setState({isPlaying:false})
                
            }

        },100)
            
    }
 

    //function to slect the menu items
    selectMenu=(e)=>{
 
        const menuItem=document.getElementsByClassName(this.state.activeMenuClass);
        const currentMenu=document.getElementsByClassName(this.state.activeMenu);
        

        //audio volume control on rotating
        if(this.state.activeMenu==="now-playing-menu"||this.state.activeMenu==="lock-menu"){
            if(e.detail.distanceFromLast>0){
                if(this.state.audioVolume<=0.99){
                    this.state.currentAudio.volume=  this.state.audioVolume + this.volume;
                    this.setState({volume:this.state.audioVolume + this.volume}) ;     
                }
            }else if(e.detail.distanceFromLast<0){
                if(this.state.audioVolume>=0.01){
                    this.state.currentAudio.volume=  this.state.audioVolume - this.volume;
                    this.setState({volume:this.state.audioVolume - this.volume}) ;  
                }
            }

        }

        //video volume control on rotating
        if(this.state.activeMenu==="video-playing-menu"){
            if(e.detail.distanceFromLast>0){
                if(this.state.videoVolume<=0.99){
                    var vid = document.getElementById("display-video");
                    vid.volume=  this.state.videoVolume + this.volume;
                    this.setState({volume:this.state.videoVolume + this.volume}) ;    
                }
            }else if(e.detail.distanceFromLast<0){
                if(this.state.videoVolume>=0.01){
                    var vid = document.getElementById("display-video")
                    vid.volume=  this.state.videoVolume - this.volume;
                    this.setState({volume:this.state.videoVolume - this.volume}) ;  
                }
            }

        }



        if(menuItem.length===0)
            return;//if there are no menu item to be just return


        //if menu list item are more than 5, shifting list item up (styling)    
        if(this.i>4){
            var value = (this.i-4)*25;
            currentMenu[0].style.transform = 'translateY(-'+value+'px)'
         
        }else{ 
            currentMenu[0].style.transform = 'translateY(0)'
        }
        this.j=this.i;


        //if currently at theme menu, then rotating on wheel show the change in color
        if(this.state.activeMenu==='theme-menu'){
            if(e.detail.distanceFromLast>0){
                this.color++;
                document.getElementsByClassName('theme-menu')[0].style.filter = " hue-rotate("+this.color+"deg)";
                this.hue++;
                document.getElementsByClassName('notification-bar')[0].style.backgroundColor = "hsla("+this.hue+",50.2%,52.0%,0.8)"
                document.getElementsByClassName('theme-menu-icon')[0].style.transform = "rotate("+this.color+"deg)";
              

            }else if(e.detail.distanceFromLast<0){
                this.color--;
                document.getElementsByClassName('theme-menu')[0].style.filter = " hue-rotate("+this.color+"deg)";
                this.hue--;
                document.getElementsByClassName('notification-bar')[0].style.backgroundColor = "hsla("+this.hue+",50.2%,52.0%,0.8)"
                document.getElementsByClassName('theme-menu-icon')[0].style.transform = "rotate("+this.color+"deg)";
              
            }
            this.setState({
                
                filter:" hue-rotate("+this.color+"deg)",
                notificationBarColor:"hsla("+this.hue+",50.2%,52.0%,0.8)",
                progressBarColor:"hsla("+this.hue+",50.2%,52.0%,0.4)"
            });
            return;
        }

        // changing the value of this.i and this.j to select new menu item and deselect prev menu item in a list 
        if(e.detail.distanceFromLast>0){

            this.skip++;
            if(this.skip>15){
                if(this.i<menuItem.length-1) this.i++;
                else this.i=0;
               
                this.skip=1;
            }

        }else if(e.detail.distanceFromLast<0){

            this.skip++;
            if(this.skip>15){
                if(this.i>0) this.i--;
                else this.i=menuItem.length-1;
           
                this.skip=1;
            }

        }
        //focusing the current select menu item
        menuItem[this.j].style.backgroundColor='';
        menuItem[this.j].style.color='black';
        menuItem[this.i].style.backgroundColor='rgb(71, 169, 194,.8)';
        menuItem[this.i].style.color='white';


        //when active menu is wallpaper then on rotating it shows currently selected Background
        if(this.state.activeMenu==="wallpaper-menu"){
            document.getElementsByClassName('display')[0].style.backgroundImage = "url("+wallpaper[this.i] +")"
        }
        

        //setting right side display data (information on ever list item)
        if(this.state.activeMenu!=='wallpaper-menu') //giving a check on which menu this should on update
            this.setState({rightDisplayData:this.state.rightDisplayMenu[this.i]});

    }

    //function to set up what is to be shown right side of diplay 
    rightDisplay = () =>{

        //using switch function
        var menu= this.state.activeMenu;
        
        switch (menu) {
            case "lock-menu":
                this.setState({
                    showRightDisplay:false
                })
                break; 
            case "now-playing-menu":
            this.setState({
                showRightDisplay:false
            })
            break; 


            case "main-menu":
                this.setState({
                    rightDisplayMenu:MainMenuData,
                    rightDisplayData:MainMenuData[0],
                    showRightDisplay:true,
                })
                break;

            case "song-menu":
                this.setState({
                    rightDisplayMenu:SongsMenuData,
                    rightDisplayData:SongsMenuData[0],
                    showRightDisplay:true,
                })
                break; 

            case "video-menu":
                this.setState({
                    showRightDisplay:false
                })
                break;  

            case "game-menu":
                this.setState({
                    showRightDisplay:false
                })
                break; 

            case "setting-menu":
                this.setState({
                    rightDisplayMenu:SettingMenuData,
                    rightDisplayData:SettingMenuData[0],
                    showRightDisplay:true,
                })
                break; 

            case "all-songs-menu":
                this.setState({
                    showRightDisplay:false
                })
                break; 

            case "artists-menu":
                this.setState({
                    showRightDisplay:false
                })
                break; 

            case "artist-songs-menu":
                this.setState({
                    showRightDisplay:false
                })
                break; 
            case "albums-menu":
                this.setState({
                    showRightDisplay:false
                })
                break; 

            case "album-songs-menu":
                this.setState({
                    showRightDisplay:false
                })
                break; 

            case "song-setting-menu":
                this.setState({
                    rightDisplayMenu:SongSettingMenuData,
                    rightDisplayData:SongSettingMenuData[0],
                    showRightDisplay:true,
                })
                break;    
                
            case "wallpaper-menu":
                this.setState({
                    rightDisplayData:{
                        img:'',
                        info:'Click on Main Button to Update Wallpaper'
                    },
                    showRightDisplay:true,
                })
                break;  

            case "theme-menu":
                this.setState({
                    rightDisplayMenu:[
                        {
                            src:theme,
                            info:'Rotate the wheel'
                        },
                    ],
                    
                    rightDisplayData:{
                        src:theme,
                        info:'Rotate the wheel'
                    },
                    showRightDisplay:true,
                })
                break;

            case "font-size-menu":
                this.setState({
                    rightDisplayMenu:[
                        {
                            src:'',
                            info:'Select the font size to see changes'
                        },
                        {
                            src:'',
                            info:'Select the font size to see changes'
                        },
                        {
                            src:'',
                            info:'Select the font size to see changes'
                        },
                        {
                            src:'',
                            info:'Select the font size to see changes'
                        },
                        {
                            src:'',
                            info:'Select the font size to see changes'
                        },
                    ],
                    
                    rightDisplayData:{
                        src:'',
                        info:'Select the font size to see changes'
                        
                    },
                    showRightDisplay:true,
                })
                break; 


                // case "":
                // break;
                
        
            default:
                break;
        }


    }



    //updating the current menu when the main button is pressed
    updateMenu= () => {
        
        

        const menuItem=document.getElementsByClassName(this.state.activeMenuClass);

        if(menuItem.length===0){

            if(this.state.activeMenu==='lock-menu'){//if menu is lock-menu, updating to main menu
                this.setState({
                    activeMenu:'main-menu',
                    activeMenuClass:'main-menu-list-item',
                    showRightDisplay:true,
                    rightDisplayMenu:MainMenuData,

                })
                document.getElementsByClassName(this.state.activeMenuClass)[0].style.backgroundColor='rgb(71, 169, 194,.8)';
                document.getElementsByClassName(this.state.activeMenuClass)[0].style.color='white';


                this.unlock.play();;
            }

            if(this.state.activeMenu==='now-playing-menu'){//if current menu is now playing then click on main button will play or pause the song
                if(!this.state.isPlaying){
                    this.state.currentAudio.play();
                    this.setState({isPlaying:true})

                }else{ 
                    this.state.currentAudio.pause();
                    this.setState({isPlaying:false})
                }

                this.setState({showRightDisplay:false});//now playing menu doesnt have right display
                this.click.play();// sound of click
            }

            if(this.state.activeMenu==="video-playing-menu"){//if current menu is playing video then click on main button play or pause video 
                if(this.state.isVideoPlaying){
                    document.getElementById("display-video").pause();
                    this.setState({isVideoPlaying:false});
                }else{
                    document.getElementById("display-video").play();
                    this.setState({isVideoPlaying:true});
                }
                this.click.play();// sound of click
            }
            

            return;//return if there are no menu list items
        }

        this.click.play();// sound of click

        if(this.state.activeMenu==="theme-menu"){
            return;//clicking main buton should not do anything if main menu is theme
        }
       

       

        

      
        //data values sent by the selected  option
        const data=document.getElementsByClassName(this.state.activeMenuClass)[this.i].getAttribute('data');


        //auto-play setting on or off
        if(data==="auto-play"){
            if(this.state.autoPlay){
                this.setState({autoPlay:false})
            }else this.setState({autoPlay:true})
            return;
        }

        //repeat setting on or off
        if(data==="repeat"){
            if(this.state.repeat){
                this.setState({repeat:false})
            }else{
                this.setState({
                    repeat:true,
                    suffle:false //if repeat is on then suffle has to off
                })
            }
            return;
        }
        if(data==="suffle"){
            if(this.state.suffle){
                this.setState({suffle:false})
            }else{ 
                this.setState({
                    suffle:true,
                    repeat:false // if suffle is onn then reapeat is off
                })
            }
            return;
        }


        //In song list if song is clicked then audio is changed
        if(data==="play-song"){

            this.state.currentAudio.pause()// if any song is playing then it will be paused
            this.setState({audioIndex:this.i})  ;  
            this.audio=new Audio(SongsData[this.i].src);
            this.setState({currentAudio:this.audio});
            this.state.currentAudio.play();
            this.setState({isPlaying:true});
        }

        

        if(data==="play-video"){
            this.setState({
                videoIndex:this.i,
                isVideoPlaying:true
            });

        }


        //choosing which menu is selected from albums or artist
        if(data==="artist"||data==="album"){
            this.setState({artistOrAlbum:data})
        }

        //when menu is updating from artist/album songs menu to now palying menu, that is playing song form artist or album song
        if(this.state.activeMenu==='artist-songs-menu'||this.state.activeMenu==='album-songs-menu'){
            var value = parseInt(data);
            this.state.currentAudio.pause()//if song is already playing, so we pause and then change current audio
            this.setState({
                currentAudio:new Audio(SongsData[value].src),
                audioIndex:value,
                isPlaying:true
            })
            this.state.currentAudio.play();//play the newly selected song
        }


        //attribute "value" give the value of menu to shown when clicked
        const selected=document.getElementsByClassName(this.state.activeMenuClass)[this.i].getAttribute('value');

        //changing wallpaper
        if(selected==="change-wallpaper"){
            var i = parseInt(data);
            this.setState({wallpaperIndex:i})
            return;
        }


        //font size setting
        if(selected==="small"||selected==="medium"||selected==="large"){

            this.setState({fontSize:data});
            return;
        }


        //updating state of to new active menu
        const newMenu=selected+'-list-item';
        this.setState({
            activeMenuClass:newMenu,
            activeMenu:selected,
            menuIndex:this.state.menuIndex+1
        });
        //after here on, the change are maid on new active menu
        //            |
        //            |
        //            v

        if(this.state.activeMenu==="video-playing-menu"){

            //if song is playing then pause the song,then play video
            if(this.state.isPlaying){
                this.state.currentAudio.pause();
                this.setState({isPlaying:false});
            }

            
            document.getElementById('display-video').play();

        }

        //updating background hue filter of left menu to show the currently modified theme
        if(this.state.activeMenu==="theme-menu"){
            document.getElementsByClassName('theme-menu')[0].style.filter=this.state.filter;
        }


        //showing first item as selected
        if(document.getElementsByClassName(this.state.activeMenuClass).length!==0){
            document.getElementsByClassName(this.state.activeMenuClass)[0].style.backgroundColor='rgb(71, 169, 194,.8)';
            document.getElementsByClassName(this.state.activeMenuClass)[0].style.color='white';
        }


        //when acive menu is artist or album song, then updating song to be show in list
        if(this.state.activeMenu==='artist-songs-menu'||this.state.activeMenu==='album-songs-menu'){
            console.log('data ',data);
            var arr=data.split(',');
            console.log('arr ',arr);
            this.setState({currentArtistOrAlbum:arr});
        }

        //updating right side display
        this.rightDisplay();


        //reinisialitzing the values again after updataing
        this.angle=-1;
        this.j=0;
        this.i=0;

        
    }


    
    //when menu buton is clicked..updating to previous menues
    updateBackMenu = () =>{

        this.click.play(); //sound of click 

        const prevMenu=document.getElementsByClassName(this.state.activeMenu)[0].getAttribute('prevMenu');
        if(prevMenu.localeCompare('none')===0){
            // this.state.currentAudio.pause();
            // this.setState({isPlaying:false});
            return ;
        }
        
        //if previous menu was wallpaper menu,then setting state..reseting current wallpaper that was set if it hasnt been updated
        if(this.state.activeMenu==="wallpaper-menu"){
            const i=this.state.wallpaperIndex;
            this.setState({wallpaperIndex:-1});
            this.setState({wallpaperIndex:i});
        }

        //if previous mene is theme menu, then rotate the right icon to normal
        if(this.state.activeMenu==="theme-menu"){
            if(this.color>0)
                document.getElementById('right-image').style.transform = "rotate(-"+this.color+"deg)";
            else if(this.color<0)
                document.getElementById('right-image').style.transform = "rotate("+(-this.color)+"deg)";
        }
       

        this.setState({activeMenu:prevMenu,activeMenuClass:prevMenu+'-list-item'});


        //showing first item as selected
        if(document.getElementsByClassName(this.state.activeMenuClass).length!==0){
            document.getElementsByClassName(this.state.activeMenuClass)[0].style.backgroundColor='rgb(71, 169, 194,.8)';
            document.getElementsByClassName(this.state.activeMenuClass)[0].style.color='white';

        }
        //updating right side display
        this.rightDisplay()

        //reinisialitzing the values again after updataing
        this.angle=0;
        this.j=0;
        this.i=0;

      

     

    }

    //play or pause the song
    playPause = () =>{


        //if current menu is playing video then click on play/Pause should play or pause video only
        if(this.state.activeMenu==="video-playing-menu"){
            if(this.state.isVideoPlaying){
                document.getElementById("display-video").pause();
                this.setState({isVideoPlaying:false});
            }else{
                document.getElementById("display-video").play();
                this.setState({isVideoPlaying:true});
            }
            return;
        }else{
        

            //if song is playing
            if(!this.state.isPlaying){
                this.state.currentAudio.play();
                this.setState({isPlaying:true});
            }
            //if song is not playing
            else if(this.state.isPlaying){
                this.state.currentAudio.pause();
                this.setState({isPlaying:false});
            }
        }
    }

    nextMedia = () => {


        //if current menu is video playing menu then buttons function for video only
        if(this.state.activeMenu==="video-playing-menu"){

            //pause the current video
            document.getElementById('display-video').play();
            this.setState({isVideoPlaying:false})

            //change to next video
            if(this.state.videoIndex<VideosData.length-1)
                this.setState( {videoIndex : this.state.videoIndex+1});
            else this.setState( {videoIndex : 0});

            //play change video
            document.getElementById('display-video').play();
            this.setState({isVideoPlaying:true})

        


        }else{

           
            

            var play=false; //if the song wasn't playing
            // play variable is used with the combination of second playPause() call
            // so that it doesnt play the song if it was not playing previously
    
            //if the song is playing
            if(this.state.isPlaying){ 
                this.playPause(); //stop playing the song
                play=true;
            }
    
            //setting next song index

            if(this.state.suffle){  //if suffle is onn then clicking on next plays random song

                var index = Math.floor(Math.random() * SongsData.length);    
                this.setState({audioIndex:index});                        

            }else{

                if(this.state.audioIndex<SongsData.length-1){
                    this.setState({audioIndex:this.state.audioIndex+1})
                }else this.setState({audioIndex:0})
            }
           
    
            this.audio = new Audio(SongsData[this.state.audioIndex].src);
            this.setState({currentAudio:this.audio}) //change the current song
    
            if(!this.state.isPlaying&&play)
                this.playPause(); //play the song

        }

       

    }


    // same funtionality as nextmedia() function except index is decreasing
    prevMedia = () => {

        if(this.state.activeMenu==="video-playing-menu"){


            document.getElementById('display-video').play();
            this.setState({isVideoPlaying:false})

            if(this.state.videoIndex>0)
                this.setState( {videoIndex : this.state.videoIndex-1});
            else this.setState( {videoIndex : VideosData.length-1});

            document.getElementById('display-video').play();
            this.setState({isVideoPlaying:true})

        


        }else{

            var play=false;
            if(this.state.isPlaying){
                this.playPause();
                play=true;
            }

            if(this.state.audioIndex>0)
                this.setState( {audioIndex : this.state.audioIndex-1});
            else this.setState( {audioIndex : SongsData.length-1});
        

            this.audio = new Audio(SongsData[this.state.audioIndex].src);
            this.setState({currentAudio:this.audio})

            if(!this.state.isPlaying&&play)
                this.playPause();
        }

    }
    seekRight=(e)=>{
        if(this.state.activeMenu==="video-playing-menu"){
            document.getElementById('display-video').currentTime+=(e.detail.interval/50);
        }else
        this.state.currentAudio.currentTime=this.state.currentAudio.currentTime+(e.detail.interval/50);
    }
    seekLeft=(e)=>{
        if(this.state.activeMenu==="video-playing-menu"){
            document.getElementById('display-video').currentTime-=(e.detail.interval/50);
        }else
        this.state.currentAudio.currentTime=this.state.currentAudio.currentTime-(e.detail.interval/50);
    }
   
    

    
    render(){
        return (
            <div className="i-pod">
                <Display
                    index={this.state.audioIndex} 
                    audio={this.state.currentAudio}
                    currentMenu={this.state.activeMenu}
                    isPlaying={this.state.isPlaying}
                    currentArtistOrAlbum={this.state.currentArtistOrAlbum}
                    artistOrAlbum={this.state.artistOrAlbum}
                    wallpaperIndex={this.state.wallpaperIndex}
                    showRightDisplay={this.state.showRightDisplay}
                    rightDisplayData={this.state.rightDisplayData}
                    notificationBarColor={this.state.notificationBarColor}
                    progressBarColor={this.state.progressBarColor}
                    videoIndex={this.state.videoIndex}
                    isVideoPlaying={this.state.isVideoPlaying}
                    filter={this.state.filter}
                    autoPlay={this.state.autoPlay}
                    repeat={this.state.repeat}
                    suffle={this.state.suffle}
                    fontSize={this.state.fontSize}


                />

                <Buttons  
                    select={this.selectMenu}
                    update={this.updateMenu}
                    back={this.updateBackMenu}
                    playPause={this.playPause} 
                    nextMedia={this.nextMedia}
                    prevMedia={this.prevMedia}
                    seekLeft={this.seekLeft}
                    seekRight={this.seekRight}
                />

            </div>
        );
        
    }
   
}
export default IPod;

