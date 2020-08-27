import React from 'react';
import '../css/ThemeMenu.css';

class ThemeMenu extends React.Component{
    render(){
        return(
            <div className="theme-menu" id="left-display" prevmenu="setting-menu">
              
                    <div className="theme-menu-list-item" value="change-theme">This is how the display will look like </div>
                   


           
            </div>
        )
    }
}

export default ThemeMenu;
