import React from 'react';
import '../css/SettingMenu.css';

class SettingMenu extends React.Component{
    render(){
        const styles = {
            fontSize:this.props.fontSize,
            filter:this.props.filter
        }
        
        return(
            <div className="setting-menu" style={styles} id="left-display" prevmenu="main-menu">

                <div className="setting-menu-list-item" value="theme-menu">Theme</div>
                <div className="setting-menu-list-item" value="wallpaper-menu">Wallpaper</div>
                <div className="setting-menu-list-item" value="font-size-menu">Font Size</div>

                
            </div>
        )
    }
}

export default SettingMenu;
 
