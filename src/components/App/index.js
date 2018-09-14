import React, { PureComponent } from 'react';
import AppStageDate from '../AppStageDate';
import Helpers from '../../helpers';
import './style.css';

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
    this.changeCurrent = this.changeCurrent.bind(this);
    this.changePeriod = this.changePeriod.bind(this);
  }

  componentWillMount() {
    const { maxValueInMonth, defaultValueInMonth } = this.state;
    this.createEndPeriod('start', maxValueInMonth, 'end');
    this.createEndPeriod('start', 0, 'startingCurrent');
    this.createEndPeriod(
      'start',
      defaultValueInMonth,
      'endingCurrent',
    );
    this.createEndPeriod('start', 0, 'startingPeriod');
    this.createEndPeriod(
      'start',
      defaultValueInMonth,
      'endingPeriod',
    );
  }

  changePeriod = (key, step) => {
    const that = this.state;
    const startMonth = that[`${key}`].getMonth();
    const newState = new Date(that[`${key}`]);
    newState.setMonth(startMonth + step);
    this.setState(() => ({ [`${key}`]: newState }));
  };

  changeCurrent = (key, newDate) => {
    const that = this.state;
    return (key === 'startingCurrent' && newDate > that.endingCurrent) ? this.setState({
      endingCurrent: newDate,
      endingPeriod: newDate,
      [`${key}`]: new Date(newDate),
    }) : this.setState({ [`${key}`]: new Date(newDate) });
  }

  createEndPeriod = (start, monthValue, change) => {
    const that = this.state;
    const startMonth = that[`${start}`].getMonth();
    const newState = new Date(that[`${start}`]);
    newState.setMonth(startMonth + monthValue);
    this.setState({ [change]: newState });
  };


  render() {
    const {
      startingCurrent, start, end, startingPeriod, endingCurrent, endingPeriod,
    } = this.state;
    return (
      <div className="app">
        <div className="app__dateBox">
          <div className="app__boxElement">
            <h1 className="app__dateTitle">
              <span className="app__title">Starting </span>
              {Helpers.createDateString(startingCurrent)}
            </h1>
            <AppStageDate
              key="starting"
              start={start}
              end={end}
              current={startingCurrent}
              period={startingPeriod}
              changeCurrentValue={this.changeCurrent('startingCurrent')}
              changeCurrentPeriod={this.changePeriod('startingPeriod')}
            />
          </div>
          <div className="app__boxElement">
            <h1 className="app__dateTitle">
              <span className="app__title">Ending </span>
              {Helpers.createDateString(endingCurrent)}
            </h1>
            <AppStageDate
              key="ending"
              start={startingCurrent}
              end={end}
              current={endingCurrent}
              period={endingPeriod}
              changeCurrentValue={this.changeCurrent('endingCurrent')}
              changeCurrentPeriod={this.changePeriod('endingPeriod')}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
