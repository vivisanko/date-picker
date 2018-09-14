import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import NavigationPanel from '../NavigationPanel';
import MonthlyCalendar from '../MonthlyCalendar';
import Helpers from '../../helpers';
import './style.css';

class AppStageDate extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleDateClick = this.handleDateClick.bind(this);
  }

  determineIsStepsDisable = (step) => {
    const { period, start, end } = this.props;
    let isDisable;
    if (step === 'prev') {
      isDisable = Helpers.checkFullCoincidenceDates(period, start, false);
    }
    if (step === 'next') {
      isDisable = Helpers.checkFullCoincidenceDates(period, end, false);
    }
    return isDisable;
  };

  handleButtonClick = (event) => {
    const { changeCurrentPeriod } = this.props;
    const step = event.target.id === 'next' ? 1 : -1;
    changeCurrentPeriod(step);
  };

  handleDateClick = (day) => {
    const {
      period, start, end, changeCurrentValue,
    } = this.props;
    const newDay = new Date(period);
    newDay.setDate(day);
    if (Helpers.determineIsDateInInterval(start, newDay, end)) {
      changeCurrentValue(newDay);
    }
  };

  determineIsItHasUserDay = () => {
    const { period, current } = this.props;
    const userDay = Helpers.checkFullCoincidenceDates(period, current, false);
    return userDay ? current.getDate() : null;
  }

  findDisabledDates = () => {
    const { period, start, end } = this.props;
    const disableDates = [];
    if (Helpers.checkFullCoincidenceDates(start, period, false)) {
      for (let i = 1; i < start.getDate(); i += 1) {
        disableDates.push(i);
      }
    }
    if (Helpers.checkFullCoincidenceDates(end, period, false)) {
      for (let i = end.getDate() + 1; i < 32; i += 1) {
        disableDates.push(i);
      }
    }
    return disableDates;
  }

  render() {
    const { period, current } = this.props;
    return (
      <div className="appStageDate__box">
        <NavigationPanel
          period={period}
          buttonClick={this.handleButtonClick}
          isDisableNext={this.determineIsStepsDisable('next')}
          isDisablePrev={this.determineIsStepsDisable('prev')}
        />

        <MonthlyCalendar
          period={period}
          chosen={current}
          dateClick={this.handleDateClick}
          userDay={this.determineIsItHasUserDay()}
          disableDates={this.findDisabledDates()}
        />
      </div>
    );
  }
}

AppStageDate.propTypes = {
  start: PropTypes.instanceOf(Date).isRequired,
  end: PropTypes.instanceOf(Date).isRequired,
  current: PropTypes.instanceOf(Date).isRequired,
  period: PropTypes.instanceOf(Date).isRequired,
  changeCurrentValue: PropTypes.func.isRequired,
  changeCurrentPeriod: PropTypes.func.isRequired,
};

export default AppStageDate;
