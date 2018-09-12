import React, { PureComponent } from "react";
import AppStageDate from "../AppStageDate";
import Helpers from "../../helpers";
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
    return (
      <div className="app">
        <div className="app__dateBox">
          <div className="app__boxElement">
            <h1>
              <span className="app__dateTitle">Starting </span>
              {Helpers.createDateString(this.state.startingCurrent)}
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
              {Helpers.createDateString(this.state.endingCurrent)}
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

  
}

export default App;
