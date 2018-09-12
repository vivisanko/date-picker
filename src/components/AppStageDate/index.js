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
    if (step === "prev") {
      return Helpers.checkFullCoincidenceDates(this.props.period,this.props.start, false)
    }
    if (step === "next") {
      return Helpers.checkFullCoincidenceDates(this.props.period,this.props.end, false)
    }
  };

  determineIsItHasUserDay() {
      return Helpers.checkFullCoincidenceDates(this.props.period, this.props.current, false) ? this.props.current.getDate(): null
  }

  handleButtonClick = event => {
    let step = event.target.id === "next" ? 1 : -1;
    this.props.changeCurrentPeriod(step);
  };

  handleDateClick = day => {
    let newDay = new Date(this.props.period);
    newDay.setDate(day);
    if (Helpers.determineIsDateInInterval(this.props.start,newDay,this.props.end)) {
      this.props.changeCurrentValue(newDay);
    }
    return;
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
