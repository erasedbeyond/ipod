import React from 'react';
import '../css/GameMenu.css';
import dice from '../assets/image/dice.png'

class GameMenu extends React.Component{
    render(){
        return(
            <div className="game-menu"  prevmenu="main-menu">
                <img src={dice}/>
             
                
            </div>
        )
    }
}

export default GameMenu;
 
