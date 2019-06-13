import * as React from 'react';
import { Provider } from "react-redux";
import Game from "./Game";
import store from "./store";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            flexDirection: "row"
          }}
        >
          <Game />
        </div>
      </Provider>
    );
  }
}

export default App;
