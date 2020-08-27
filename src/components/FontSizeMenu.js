import React from 'react';
import '../css/FontSizeMenu.css';

class FontSizeMenu extends React.Component{
    render(){
        const styles = {
            filter:this.props.filter,
            fontSize:this.props.fontSize
        }
        console.log('font update ',this.props.fontSize);
        
        return(
            <div className="font-size-menu" style={styles} id="left-display" prevmenu="setting-menu">

                <div className="font-size-menu-list-item" value='small' data="0.5rem">Tiny</div>
                <div className="font-size-menu-list-item" value='small' data="0.6rem">Small</div>
                <div className="font-size-menu-list-item" value='medium' data="0.7rem">Normal</div>
                <div className="font-size-menu-list-item" value='small' data="0.8rem">Medium</div>
                <div className="font-size-menu-list-item" value='large' data="0.85rem">Large</div>

                
            </div>
        )
    }
}

export default FontSizeMenu;
