import React, { PureComponent } from "react";
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
      ],
      monthDays: []
    };

    this.createMonthDays = this.createMonthDays.bind(this);
  }

  componentWillMount() {
    this.createMonthDays(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createMonthDays(nextProps);
  }

  render() {
    const weekDaysName = this.state.weekDays.map((day, index) => (
      <div key={index} className="monthlyCalendar__weekDays">
        {day.slice(0, 3)}
      </div>
    ));
    const days = this.state.monthDays.map((day, index) => (
      <div
        key={index}
        className={[
          day !== ""
            ? "monthlyCalendar__weekDays monthlyCalendar__weekDays_withDate"
            : "monthlyCalendar__weekDays",
          day === this.props.userDay ? "monthlyCalendar__selectedDate" : ""
        ].join(" ")}
        onClick={this.handleClick.bind(this, index)}
      >
        {day}
      </div>
    ));

    return (
      <div className="monthlyCalendar__monthBlock">
        <div className="monthlyCalendar__weekBox monthlyCalendar__weekNamesBox">
          {weekDaysName}
        </div>
        <div className="monthlyCalendar__weekBox">{days}</div>
      </div>
    );
  }

  determineNumberDaysInMonth = (props = {}) => {
    if (!props.period) {
      return;
    }
    const month = props.period.getMonth();
    if (month === 3 || month === 5 || month === 8 || month === 10) {
      return 30;
    }
    if (month === 1) {
      const year = props.period.getFullYear();
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return 29;
      } else return 28;
    }
    return 31;
  };

  determineStartWeekDay = (props = {}) => {
    if (!props.period) {
      return;
    }
    let startDay = new Date(props.period);
    startDay.setDate(1);
    let weekDay = startDay.getDay();

    return weekDay === 0 ? 6 : weekDay - 1;
  };

  createMonthDays = props => {
    let currentMonth = [];
    let day = 1;
    const numberDaysInMonth = this.determineNumberDaysInMonth(props);

    let startInd = this.determineStartWeekDay(props);
    while (currentMonth.length < startInd) {
      currentMonth.push("");
    }
    for (let i = startInd; i < numberDaysInMonth + startInd; i++) {
      currentMonth[i] = day;
      day += 1;
    }

    while (currentMonth.length % 7 !== 0) {
      currentMonth.push("");
    }

    this.setState(() => ({
      monthDays: currentMonth
    }));
  };

  handleClick = ind => {
    if (this.state.monthDays[ind] !== "") {
      let chosen = new Date(this.props.period);
      chosen.setDate(this.state.monthDays[ind]);
      this.props.dateClick(this.state.monthDays[ind]);

      this.setState({
        userDate: chosen,
        userDay: this.state.monthDays[ind]
      });
    }
  };
}

export default MonthlyCalendar;
