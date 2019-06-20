import * as React from 'react';
import { startGame } from '../store/gameReducer';
import { connect } from "react-redux";
import Menu from "./Menu";
import GameOver from "./GameOver";
import CanvasProps from "../util/interfaces/canvasProps";

interface UIProps {
  canvasProps: CanvasProps,
  menu: boolean,
  gameStarted: boolean,
  gameOver: boolean,
  startGame: any
}

interface UIState {}

export class UI extends React.Component<UIProps, UIState> {
  constructor(props) {
    super(props);
  }

  onButtonClick = (): void => {
    this.props.startGame();
  }

  render() {
    const { canvasProps, menu, gameStarted, gameOver } = this.props;

    if (menu && !gameStarted && !gameOver)
      return (
        <Menu canvasProps={canvasProps} onButtonClick={this.onButtonClick}/>
      )
    
    if (gameStarted && gameOver)
      return (
        <GameOver canvasProps={canvasProps} onButtonClick={this.onButtonClick}/>
      )

    return null;
  }
}

const mapStateToProps = ({ canvasProps, menu, gameStarted, gameOver }: UIProps) => ({
  canvasProps,
  menu,
  gameStarted,
  gameOver,
  startGame
});

const mapDispatchToProps = dispatch => ({
  startGame: () => dispatch(startGame())
});

export default connect(mapStateToProps, mapDispatchToProps)(UI);
