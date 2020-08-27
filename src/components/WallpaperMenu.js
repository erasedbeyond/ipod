import {wallpaper} from '../assets/datafiles/WallpaperData';
import React from 'react';
import '../css/WallpaperMenu.css';

class WallpaperMenu extends React.Component{
    render(){
        const styles = {
            fontSize:this.props.fontSize,
            filter:this.props.filter
        }
        
        return(
            <div className="wallpaper-menu"style={styles} id="left-display" prevmenu="setting-menu">
                {wallpaper.map((item,index)=>{
                    return <div className="wallpaper-menu-list-item" value="change-wallpaper" data={index} key={index}>Wallpaper {index+1}  </div>
                })}
                
            </div>
        )
    }
}

export default WallpaperMenu;
