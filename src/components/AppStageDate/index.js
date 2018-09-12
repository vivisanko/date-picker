import React, { PureComponent } from "react";
import NavigationPanel from "../NavigationPanel";
import MonthlyCalendar from "../MonthlyCalendar";
import Helpers from "../../helpers";
import "./style.css";

class AppStageDate extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedPeriod: null,
      selectedDate: null
    };
  }

  render() {
    return (
      <div className="appStageDate__box">
        <NavigationPanel
          period={this.props.period}
          buttonClick={this.handleButtonClick.bind(this)}
          isDisableNext={this.determineIsStepsDisable("next")}
          isDisablePrev={this.determineIsStepsDisable("prev")}
        />

        <MonthlyCalendar
          period={this.props.period}
          chosen={this.props.current}
          dateClick={this.handleDateClick.bind(this)}
          userDay={this.determineIsItHasUserDay()}
          disableDates={this.findDisabledDates()}
        />
      </div>
    );
  }

  determineIsStepsDisable = step => {
    let currentPoint = new Date(this.props.period);
    let startPoint = new Date(this.props.start);
    let endPoint = new Date(this.props.end);

    if (step === "prev") {
      return (
        currentPoint.getMonth() === startPoint.getMonth() &&
        currentPoint.getFullYear() === startPoint.getFullYear()
      );
    }
    if (step === "next") {
      return (
        currentPoint.getMonth() === endPoint.getMonth() &&
        currentPoint.getFullYear() === endPoint.getFullYear()
      );
    }
  };

  determineIsItHasUserDay() {
    let date1 = new Date(this.props.period);
    let date2 = new Date(this.props.current);
    if (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth()
    ) {
      return date2.getDate();
    }
    return null;
  }

  handleButtonClick = event => {
    let step = event.target.id === "next" ? 1 : -1;
    this.props.changeCurrentPeriod(step);
  };

  handleDateClick = day => {
    let newDay = new Date(this.props.period);
    newDay.setDate(day);

    let from = new Date(this.props.start);
    from.setDate(from.getDate() - 1);
    let to = new Date(this.props.end);
    to.setDate(to.getDate() + 1);
    if (newDay > from && newDay < to) {
      this.props.changeCurrentValue(newDay);
      return;
    }
  };

  findDisabledDates = () => {
    let disableDates = [];
    if (Helpers.checkFullCoincidenceDates(this.props.start, this.props.period, false)) {
      for (let i = 1; i < this.props.start.getDate(); i++) {
        disableDates.push(i);
      }
    }
    if (Helpers.checkFullCoincidenceDates(this.props.end, this.props.period, false)) {
      for (let i = this.props.end.getDate() + 1; i < 32; i++) {
        disableDates.push(i);
      }
    }
    return disableDates;
  };
}

export default AppStageDate;
