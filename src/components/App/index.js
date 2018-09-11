import React, { PureComponent } from "react";
import AppStageDate from "../AppStageDate";

import "./style.css";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      start: new Date(),
      maxValueInMonth: 36,
      defaultValueInMonth: 3,
      end: null,
      startingCurrent: null,
      startingPeriod: null,
      endingCurrent: null,
      endingPeriod: null,
      isMistake: false
    };

    this.createEndPeriod = this.createEndPeriod.bind(this);
  }

  componentWillMount() {
    this.createEndPeriod("start", this.state.maxValueInMonth, "end");
    this.createEndPeriod("start", 0, "startingCurrent");
    this.createEndPeriod(
      "start",
      this.state.defaultValueInMonth,
      "endingCurrent"
    );
    this.createEndPeriod("start", 0, "startingPeriod");
    this.createEndPeriod(
      "start",
      this.state.defaultValueInMonth,
      "endingPeriod"
    );
  }

  render() {
    const mistakeBody = this.state.isMistake && (
      <div>
        Starting can't be later than ending and the starting can't be earlier
        than now
      </div>
    );
    return (
      <div className="app">
        <div className="app__dateBox">
          <div className="app__boxElement">
            <h1>
              <span className="app__dateTitle">Starting </span>
              {this.createDateString(this.state.startingCurrent)}
            </h1>
            <AppStageDate
              key="starting"
              start={this.state.start}
              end={this.state.end}
              current={this.state.startingCurrent}
              period={this.state.startingPeriod}
              changeCurrentValue={this.changeCurrent.bind(
                this,
                "startingCurrent"
              )}
              changeCurrentPeriod={this.changePeriod.bind(
                this,
                "startingPeriod"
              )}
            />
          </div>
          <div className="app__boxElement">
            <h1>
              <span className="app__dateTitle">Ending </span>
              {this.createDateString(this.state.endingCurrent)}
            </h1>
            <AppStageDate
              key="ending"
              start={this.state.startingCurrent}
              end={this.state.end}
              current={this.state.endingCurrent}
              period={this.state.endingPeriod}
              changeCurrentValue={this.changeCurrent.bind(
                this,
                "endingCurrent"
              )}
              changeCurrentPeriod={this.changePeriod.bind(this, "endingPeriod")}
            />
          </div>
        </div>
        <div className="app__mistakeMessage">{mistakeBody}</div>
      </div>
    );
  }

  createEndPeriod = (start, Value, change) => {
    const startMonth = this.state[start].getMonth();
    let newState = new Date(this.state[start]);
    newState.setMonth(startMonth + Value);

    this.setState({
      [change]: newState
    });
  };

  changeCurrent = (key, newDate) => {
    if (newDate === null) {
      this.setState(() => ({
        isMistake: true
      }));
      return;
    }
    this.setState(() => ({
      isMistake: false
    }));

    this.setState(() => ({
      [key]: new Date(newDate)
    }));

    if (key === "startingCurrent" && newDate > this.state.endingCurrent) {
      this.setState({
        endingCurrent: newDate,
        endingPeriod: newDate
      });
    }
  };

  changePeriod = (key, step) => {
    let startMonth = this.state[key].getMonth();
    let newState = new Date(this.state[key]);
    newState.setMonth(startMonth + step);
    this.setState(() => ({
      [key]: newState
    }));
  };

  createDateString = date => {
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
    const mon = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${mon} ${year}`;
  };
}

export default App;
