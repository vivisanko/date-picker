import React, { Component, PureComponent } from "react";
import AppStageDate from "../AppStageDate";

import "./style.css";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      start: new Date(),
      maxIntervalInMonth: 36,
      defaultIntervalInMonth: 3,
      end: null,
      startingCurrent: null,
      endingCurrent: null
    };

    this.createEndPeriod = this.createEndPeriod.bind(this);
  }

  componentWillMount() {
    this.createEndPeriod("start", this.state.maxIntervalInMonth, "end");
    this.createEndPeriod("start", 0, "startingCurrent");
    this.createEndPeriod(
      "start",
      this.state.defaultIntervalInMonth,
      "endingCurrent"
    );
  }

  render() {
    return (
      <div className="app">
        <div className="app__dateBox">
          <div className="app__boxElement">
            <h1>Starting</h1>
            <AppStageDate
              key="starting"
              start={this.state.start}
              end={this.state.end}
              current={this.state.startingCurrent}
            />
          </div>
          <div className="app__boxElement">
            <h1>Ending</h1>
            <AppStageDate
              key="ending"
              start={this.state.start}
              end={this.state.end}
              current={this.state.endingCurrent}
            />
          </div>
        </div>
      </div>
    );
  }
  createEndPeriod = (start, interval, change) => {
    let startMonth = this.state[start].getMonth();
    let newState = new Date(this.state[start]);
    newState.setMonth(startMonth + interval);

    this.setState({
      [change]: newState
    });
  };
}

export default App;
