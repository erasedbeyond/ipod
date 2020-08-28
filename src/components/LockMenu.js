import React from 'react';
import '../css/LockMenu.css';
import unlock from '../assets/image/unlocked.png'
import dj2 from '../assets/image/dj2.svg'




class LockMenu extends React.Component{
    constructor(){
        super();
        this.state={
            date: new Date(),
            rotate:0
        }   
         
        this.time=0;  
        this.rotate=1;
    }
    
    componentDidMount(){
        this.time = setInterval(()=>{

            this.setState({
                date:new Date(),
                rotate:this.state.rotate+this.rotate
            })
            if(this.props.isPlaying){
                
                document.getElementsByClassName('locked-playing')[1].style.transform = "rotate(-"+this.state.rotate+this.rotate +"deg)";

            }
        },100)
    }  
    componentWillUnmount(){
        clearInterval(this.time);
    }  

    render(){
        const time=this.state.date.toLocaleTimeString();
        const date=this.state.date.toDateString();

        let show;
        if(this.props.isPlaying){
            show =<div className="dj" >
                    <div className="locked-playing" id="date-time">
                        <div id="lock-time">{time}</div>
                        <div id="lock-date">{date}</div>
                    </div>
                    <img className="locked-playing" src={dj2} />
                    
                     

                    </div> 

        }else{
            show = <div id="date-time">
                        <div id="lock-time">{time}</div>
                        <div id="lock-date">{date}</div>
                    </div>
        }

        return(
            <div className="lock-menu" id="left-display" prevmenu="none">
                {show}
                <div id="unlock-info"><img id="unlock-icon" alt="lock-icon" src={unlock}/><span>Press Center button to unlock the screen </span></div>

               
            </div>
        )
    }
}

export default LockMenu;
