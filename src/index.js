import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

let outterIsEqual = false;
let nestedIsEqual = false;
let deepNestIsEqual = false;

class App extends Component {
  state = {
    thing: "one",
    nestedArray: ["item 1", "item 2", { deepNest: "item 3" }]
  };

  safeStateUpdate = updateObject => {
    let safeUpdateObject = {
      ...this.state,
      nestedArray: [
        ...this.state.nestedArray.concat({ deepNest: this.state.deepNest })
      ],
      ...updateObject
    };
    return safeUpdateObject;
  };

  compareState = (objectOne, objectTwo) => {
    if (objectOne === objectTwo) outterIsEqual = true;
    if (objectOne.nestedArray === objectTwo.nestedArray) nestedIsEqual = true;
    if (objectOne.nestedArray.deepNest === objectTwo.nestedArray.deepNest)
      deepNestIsEqual = true;

    return (
      <div>
        <p>Outter Properties Are Equal: {outterIsEqual.toString()}</p>
        <p>Nested Properties Are Equal: {nestedIsEqual.toString()}</p>
        <p>Deep Nested Properties Are Equal: {deepNestIsEqual.toString()}</p>
      </div>
    );
  };

  render() {
    return (
      <div className="App">
        <h1>Shallow Spread Copy Test</h1>
        {this.compareState(this.state, { ...this.state })}
        <h1>Deep Sprad Copy Test</h1>
        {this.compareState(this.state, {
          ...this.state,
          nestedArray: [
            ...this.state.nestedArray.concat({ deepNest: this.state.deepNest })
          ]
        })}

        <h1>Safe State Update Test</h1>
        {this.compareState(this.state, this.safeStateUpdate())}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
