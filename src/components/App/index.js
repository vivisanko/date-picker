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
    const { state } = this;
    const startMonth = state[key].getMonth();
    const newState = new Date(state[key]);
    newState.setMonth(startMonth + step);
    this.setState(() => ({ [`${key}`]: newState }));
  };

  changeCurrent = (key, newDate) => {
    const { state } = this;
    this.NCalls += 1;


    if (key === 'startingCurrent' && newDate > state.endingCurrent) {
      this.setState(() => ({
        endingCurrent: newDate,
        endingPeriod: newDate,
        startingCurrent: newDate,
      }));
    } else {
      this.setState(() => ({ [key]: newDate }));
    }
  }

  createEndPeriod = (start, monthValue, change) => {
    const { state } = this;
    const startMonth = state[start].getMonth();
    const newState = new Date(state[start]);
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
            <h1 className="app__title">
              <span className="app__titleText">Starting </span>
              <span className="app__titleDate">
                {Helpers.createDateString(startingCurrent)}
              </span>
            </h1>
            <AppStageDate
              key="starting"
              start={start}
              end={end}
              current={startingCurrent}
              period={startingPeriod}
              changeCurrentValue={newDate => this.changeCurrent('startingCurrent', newDate)}
              changeCurrentPeriod={step => this.changePeriod('startingPeriod', step)}
            />
          </div>
          <div className="app__boxElement">
            <h1 className="app__title">
              <span className="app__titleText">Ending </span>
              <span className="app__titleDate">
                {Helpers.createDateString(endingCurrent)}
              </span>
            </h1>
            <AppStageDate
              key="ending"
              start={startingCurrent}
              end={end}
              current={endingCurrent}
              period={endingPeriod}
              changeCurrentValue={newDate => this.changeCurrent('endingCurrent', newDate)}
              changeCurrentPeriod={step => this.changePeriod('endingPeriod', step)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
