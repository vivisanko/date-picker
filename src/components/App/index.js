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
    const { that } = this.state;
    const startMonth = that[key].getMonth();
    const newState = new Date(key);
    newState.setMonth(startMonth + step);
    this.setState(() => ({ [key]: newState }));
  };

  changeCurrent = (key, newDate) => {
    const { endingCurrent } = this.state;
    this.setState(() => ({ [key]: new Date(newDate) }));

    if (key === 'startingCurrent' && newDate > endingCurrent) {
      this.setState({
        endingCurrent: newDate,
        endingPeriod: newDate,
      });
    }
  };

  createEndPeriod = (start, monthValue, change) => {
    const { that } = this.state;
    const startMonth = that[start].getMonth();
    const newState = new Date(that[start]);
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
              changeCurrentValue={this.changeCurrent.bind(
                this,
                'startingCurrent',
              )}
              changeCurrentPeriod={this.changePeriod.bind(
                this,
                'startingPeriod',
              )}
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
              changeCurrentValue={this.changeCurrent.bind(
                this,
                'endingCurrent',
              )}
              changeCurrentPeriod={this.changePeriod.bind(this, 'endingPeriod')}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
