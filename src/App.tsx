import * as React from 'react';
import { Provider } from "react-redux";
import Game from "./Game";
import UI from "./react-ui/UI";
import store from "./store";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Game />
        <UI />
      </Provider>
    );
  }
}

export default App;
