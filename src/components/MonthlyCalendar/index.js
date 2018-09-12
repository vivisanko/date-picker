import React, { PureComponent } from "react";
import Helpers from "../../helpers";
import "./style.css";

class MonthlyCalendar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      weekDays: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ]
    };
  }

  render() {
    const weekDaysName = this.state.weekDays.map((day, index) => (
      <div key={index} className="monthlyCalendar__weekDays">
        {day.slice(0, 3)}
      </div>
    ));
    const days = Helpers.createMonthDays(this.props.period).map(
      (day, index) => (
        <div
          key={index}
          className={[
            day !== ""
              ? "monthlyCalendar__weekDays monthlyCalendar__weekDays_withDate"
              : "monthlyCalendar__weekDays",
            day === this.props.userDay ? "monthlyCalendar__selectedDate" : "",
            this.props.disableDates.includes(day)
              ? "monthlyCalendar__disableDate"
              : ""
          ].join(" ")}
          onClick={this.handleClick.bind(this, index)}
        >
          {day}
        </div>
      )
    );

    return (
      <div className="monthlyCalendar__monthBlock">
        <div className="monthlyCalendar__weekBox monthlyCalendar__weekNamesBox">
          {weekDaysName}
        </div>
        <div className="monthlyCalendar__weekBox">{days}</div>
      </div>
    );
  }

  handleClick = ind => {
    let monthDays = Helpers.createMonthDays(this.props.period);
    if (monthDays[ind] !== "") {
      let chosen = new Date(this.props.period);
      chosen.setDate(monthDays[ind]);
      this.props.dateClick(monthDays[ind]);
    }
  };
}

export default MonthlyCalendar;
