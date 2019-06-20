import * as React from 'react';
import CanvasProps from "../util/interfaces/canvasProps";

interface MenuProps {
  canvasProps: CanvasProps,
  onButtonClick: any
}

class Menu extends React.Component<MenuProps> {
  render() {
    const { canvasProps, onButtonClick } = this.props;
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
          top: 0,
          width: canvasProps.width,
          height: canvasProps.height,
          marginTop: canvasProps.margin.top,
          marginLeft: canvasProps.margin.left
        }}
      >
        <img
          src={ blockTD }
          style={{
            width: "35%",
            alignSelf: "center",
            marginBottom: "5%",
            zIndex: 1,
            WebkitUserSelect: "none"
          }}
        />
        <img
          src={ buttonStart }
          style={{
            width: "20%",
            alignSelf: "center",
            zIndex: 1,
            WebkitUserSelect: "none",
            cursor: "pointer"
          }}
          onClick={ onButtonClick }
        />
      </div>
    );
  }
}

export default Menu;
