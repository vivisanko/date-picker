import React, { PureComponent } from "react";
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
            <h1><span className="app__dateTitle">Starting  </span>{this.createDateString(this.state.startingCurrent)}</h1>
            <AppStageDate
              key="starting"
              start={this.state.start}
              end={this.state.end}
              current={this.state.startingCurrent}
              changeCurrentInterval={this.changeCurrent.bind(
                this,
                "startingCurrent"
              )}
            />
          </div>
          <div className="app__boxElement">
            <h1><span className="app__dateTitle">Ending  </span>{this.createDateString(this.state.endingCurrent)}</h1>
            <AppStageDate
              key="ending"
              start={this.state.startingCurrent}
              end={this.state.end}
              current={this.state.endingCurrent}
              changeCurrentInterval={this.changeCurrent.bind(
                this,
                "endingCurrent"
              )}
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

  changeCurrent = (key, newDate) => {
    console.log("newDate", newDate);
    console.log("key", key);

    // this.setState(()=>({
    //   [key]: new Date(newDate)
    // }))
  };

  createDateString = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const day = date.getDate();
    const mon=months[date.getMonth()];
    const year= date.getFullYear();
  return `${day} ${mon} ${year}`
  };
}

export default App;
