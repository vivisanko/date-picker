import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helpers from '../../helpers';
import './style.css';

class MonthlyCalendar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleClick = (ind) => {
    const { period, dateClick } = this.props;
    const monthDays = Helpers.createMonthDays(period);


    if (monthDays[ind] !== '') {
      const chosen = new Date(period);
      chosen.setDate(monthDays[ind]);
      dateClick(monthDays[ind]);
    }
  };


  render() {
    const { period, userDay, disableDates } = this.props;
    const weekArr = Helpers.weekDays.map(day => (
      <div key={day} className="monthlyCalendar__weekDays">{day.slice(0, 3)}</div>
    ));
    const days = Helpers.createMonthDays(period).map(
      (day, index) => (
        <div
          key={`${period.getMonth()}_${index.toString()}`}
          className={[
            day !== ''
              ? 'monthlyCalendar__weekDays monthlyCalendar__weekDays_withDate'
              : 'monthlyCalendar__weekDays',
            day === userDay ? 'monthlyCalendar__selectedDate' : '',
            disableDates.includes(day)
              ? 'monthlyCalendar__disableDate'
              : '',
          ].join(' ')}
          onClick={() => { this.handleClick(index); }}
          onKeyUp={() => { this.handleClick(index); }}
          role="button"
          tabIndex={day === userDay ? 0 : -1}
        >
          {day}
        </div>
      ),
    );

    return (
      <div className="monthlyCalendar__monthBlock">
        <div className={['monthlyCalendar__weekBox', 'monthlyCalendar__weekNamesBox'].join(' ')}>
          {weekArr }
        </div>
        <div className="monthlyCalendar__weekBox">{days}</div>
      </div>
    );
  }
}

MonthlyCalendar.propTypes = {
  period: PropTypes.instanceOf(Date).isRequired,
  userDay: PropTypes.number,
  dateClick: PropTypes.func.isRequired,
  disableDates: PropTypes.arrayOf(PropTypes.number),

};

MonthlyCalendar.defaultProps = {
  userDay: null,
  disableDates: [],
};

export default MonthlyCalendar;
