import React from 'react';
import '../css/button.css';
import ZingTouch from 'zingtouch';
import menu from '../assets/image/menu.svg'
import playpause from '../assets/image/playpause.svg'
import prev from '../assets/image/prev.svg'
import next from '../assets/image/next.svg'
import left from '../assets/image/left.svg'
import right from '../assets/image/right.svg'




class Buttons extends React.Component{

    
    render(){
        // console.log('props',this.props.args);

        return (
            <div id="button" className="buttons">
                <div id="button-container">
                    
                        <div id="main"></div>
                        <div id="menu"><img className="button-icon" id="menu-icon" src={menu} /></div>
                        <div id="backward"><img className="button-icon" src={left} id="left-button"/><img className="button-icon" src={prev} /></div>
                        <div id="forward"><img className="button-icon" src={next} /><img className="button-icon" src={right} id="right-button" /></div>
                        <div id="play-pause"><img className="button-icon" id="play-pause-icon" src={playpause} /></div>
                    
                </div>
            </div>
        );


    
    }


    componentDidMount() {
        
        const containerElement = document.getElementById('button');
        const activeRegion = ZingTouch.Region(containerElement);
        const target = document.getElementById('button-container');
        const selectMenu=this.props.select;
        activeRegion.bind(target, 'rotate', function(e){
          selectMenu(e);            
        });


        var tap = new ZingTouch.Tap({
            maxDelay: 1000
        })
      
        //updating menu on main button click
        const main=document.getElementById('main');
        const updateMenu=this.props.update;
        var mainRegion=new ZingTouch.Region(main, true, false);
        mainRegion.bind(main, tap, function(e){
            updateMenu();
        })

        //updating menu on click of menu button
        const menu=document.getElementById('menu');
        const updateBackMenu=this.props.back;
        var menuRegion=new ZingTouch.Region(menu, true, false);
        menuRegion.bind(menu, tap, function(e){
            updateBackMenu();
        })

        //song is play/pause when this button is clicked
        const play=document.getElementById('play-pause');
        const playPause=this.props.playPause;
        var pauseRegion=new ZingTouch.Region(play, true, false);
        pauseRegion.bind(play, tap, function(e){
            playPause();
        })

        //next song is selected when next button is clicked
        const next=document.getElementById('forward');
        const nextMedia=this.props.nextMedia;
        var nextRegion=new ZingTouch.Region(next, true, false);
        nextRegion.bind(next, 'tap', function(e){
            nextMedia();
        })

        //previous song is selected when previous button is clicked
        const prev=document.getElementById('backward');
        const prevMedia=this.props.prevMedia;
        var prevRegion=new ZingTouch.Region(prev, true, false);
        prevRegion.bind(prev, 'tap', function(e){
            prevMedia();

            
        })


        //defining long tap for seeking song
        var longtap = new ZingTouch.Tap({
            maxDelay: 100000
        })

        //long pressed to seek right
        const seekright=document.getElementById('forward');
        const seekRight=this.props.seekRight;
        var seekRightRegion=new ZingTouch.Region(seekright, true, false);
        seekRightRegion.bind(seekright, longtap, function(e){
            seekRight(e);

            
        })

        //long pressed to seek left
        const seekleft=document.getElementById('backward');
        const seekLeft=this.props.seekLeft;
        var seekLeftRegion=new ZingTouch.Region(seekleft, true, false);
        seekLeftRegion.bind(seekleft, longtap, function(e){
            seekLeft(e);

            
        })




      


        
    }




  
}

export default Buttons;

