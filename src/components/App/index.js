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
    this.NCalls = 0;

    this.createEndPeriod = this.createEndPeriod.bind(this);
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
    console.log('this', this);

    const { state } = this;


    const startMonth = state[key].getMonth();
    console.log('startmonth', startMonth);
    console.log('step', step);

    const newState = new Date(state[key]);
    console.log('newState', newState);
    newState.setMonth(startMonth + step);

    this.setState(() => ({ [`${key}`]: newState }));
  };

  changeCurrent = (key, newDate) => {
    const { state } = this;
    this.NCalls += 1;
    console.log('this.NCalls', this.NCalls);
    console.log('key', key);

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
    console.log('this', this);
    console.log('localeState', state);
    console.log('start', start);
    const startMonth = state[start].getMonth();
    const newState = new Date(state[start]);
    newState.setMonth(startMonth + monthValue);

    this.setState({ [change]: newState });
  };


  render() {
    const { startingCurrent, start, end, startingPeriod, endingCurrent, endingPeriod } = this.state;
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
              changeCurrentValue={newDate => this.changeCurrent('startingCurrent', newDate)}
              changeCurrentPeriod={step => this.changePeriod('startingPeriod', step)}
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
