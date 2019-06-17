import * as React from 'react';
import { CONFIG } from '../config';

interface MenuProps {
  leftOffset: number,
  onButtonClick: any
}

class Menu extends React.Component<MenuProps> {
  render() {
    const { leftOffset, onButtonClick } = this.props;
    const blockTD = require('../../assets/ui/react-ui/block-td.png');
    const buttonStart = require('../../assets/ui/react-ui/button-start.png');

    return (
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          flexDirection: "column",
          position: "absolute",
          left: leftOffset,
          width: CONFIG.GAME_WIDTH,
          height: CONFIG.GAME_HEIGHT
        }}
      >
        <img src={ blockTD } style={{ alignSelf: "center", marginBottom: 40, zIndex: 1, WebkitUserSelect: "none" }} />
        <img src={ buttonStart } style={{ alignSelf: "center", zIndex: 1, WebkitUserSelect: "none", cursor: "pointer" }} onClick={ onButtonClick } />
      </div>
    );
  }
}

export default Menu;
