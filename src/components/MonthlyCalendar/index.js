import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helpers from '../../helpers';
import './style.css';

class MonthlyCalendar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleClick = ind => {
    let monthDays = Helpers.createMonthDays(this.props.period);
    if (monthDays[ind] !== '') {
      let chosen = new Date(this.props.period);
      chosen.setDate(monthDays[ind]);
      this.props.dateClick(monthDays[ind]);
    }
  };

  render() {
    const weekDaysName = Helpers.weekDays.map((day, index) => (
      <div key={index} className='monthlyCalendar__weekDays'>
        {day.slice(0, 3)}
      </div>
    ));
    const days = Helpers.createMonthDays(this.props.period).map(
      (day, index) => (
        <div
          key={index}
          className={[
            day !== ''
              ? 'monthlyCalendar__weekDays monthlyCalendar__weekDays_withDate'
              : 'monthlyCalendar__weekDays',
            day === this.props.userDay ? 'monthlyCalendar__selectedDate' : '',
            this.props.disableDates.includes(day)
              ? 'monthlyCalendar__disableDate'
              : ''
          ].join(' ')}
          onClick={this.handleClick.bind(this, index)}
        >
          {day}
        </div>
      )
    );

    return (
      <div className='monthlyCalendar__monthBlock'>
        <div className='monthlyCalendar__weekBox monthlyCalendar__weekNamesBox'>
          {weekDaysName}
        </div>
        <div className='monthlyCalendar__weekBox'>{days}</div>
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
