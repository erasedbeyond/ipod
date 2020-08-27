import React from 'react';
import '../css/LockMenu.css';
import unlock from '../assets/image/unlocked.png'


class LockMenu extends React.Component{
    constructor(){
        super();
        this.state={
            date: new Date()
        }   
         
        this.time=0;  
    }
    
    componentDidMount(){
        this.time = setInterval(()=>{
            this.setState({
                date:new Date()
            })
        },100)
    }  
    componentWillUnmount(){
        clearInterval(this.time);
    }  

    render(){
        const time=this.state.date.toLocaleTimeString();
        const date=this.state.date.toDateString();
        return(
            <div className="lock-menu" id="left-display" prevmenu="none">
                <div id="date-time">
                    <div id="lock-time">{time}</div>
                    <div id="lock-date">{date}</div>

                </div>
                <div id="unlock-info"><img id="unlock-icon" alt="lock-icon" src={unlock}/><span>Press Center button to unlock the screen </span></div>
               
            </div>
        )
    }
}

export default LockMenu;
