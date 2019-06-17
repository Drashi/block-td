import * as React from 'react';
import { startGame } from '../store/gameReducer';
import { connect } from "react-redux";
import { CONFIG } from "../config";
import Menu from "./Menu";
import GameOver from "./GameOver";

interface UIProps {
  menu: boolean,
  gameStarted: boolean,
  gameOver: boolean,
  startGame: any
}

interface UIState {
  leftOffset: number
}

export class UI extends React.Component<UIProps, UIState> {
  constructor(props) {
    super(props);

    this.state = {
      leftOffset: 0
    }
  }

  componentDidMount(): void {
    this.setState({ leftOffset: this.calculateLeftOffset() });

    window.addEventListener('resize', () => {
      this.setState({ leftOffset: this.calculateLeftOffset() })
    });
  }

  calculateLeftOffset(): number {
    return window.innerWidth / 2 - CONFIG.GAME_WIDTH / 2;
  }

  onButtonClick = (): void => {
    this.props.startGame();
  }

  render() {
    const { leftOffset } = this.state;
    const { menu, gameStarted, gameOver } = this.props;

    if (menu && !gameStarted && !gameOver)
      return (
        <Menu leftOffset={leftOffset} onButtonClick={this.onButtonClick}/>
      )
    
    if (gameStarted && gameOver)
      return (
        <GameOver leftOffset={leftOffset} onButtonClick={this.onButtonClick}/>
      )

    return null;
  }
}

const mapStateToProps = ({ menu, gameStarted, gameOver }: UIProps) => ({
  menu,
  gameStarted,
  gameOver,
  startGame
});

const mapDispatchToProps = dispatch => ({
  startGame: () => dispatch(startGame())
});

export default connect(mapStateToProps, mapDispatchToProps)(UI);
