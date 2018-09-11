import React, { PureComponent } from "react";
import NavigationPanel from "../NavigationPanel";
import MonthlyCalendar from "../MonthlyCalendar";
import "./style.css";

class AppStageDate extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedPeriod: null,
      isDisablePrev: true,
      isDisableNext: false,
      selectedDate: null
    };
    this.defaultSelectedPeriod = this.defaultSelectedPeriod.bind(this);
  }

  componentWillMount() {
    this.defaultSelectedPeriod(this.props.current);
  }

  componentDidMount() {
    this.determineIsStepsDisable(this.state, this.props);
  }

  render() {
  
    if (this.state.start < this.state.selectedPeriod) {
      this.defaultSelectedPeriod(this.props.current);
    }

    this.determineIsStepsDisable();

    return (
      <div className="appStageDate__box">
        <NavigationPanel
          period={this.state.selectedPeriod}
          buttonClick={this.handleButtonClick.bind(this)}
          isDisableNext={this.state.isDisableNext}
          isDisablePrev={this.state.isDisablePrev}
        />

        <MonthlyCalendar
          period={this.state.selectedPeriod}
          chosen={this.props.current}
          dateClick={this.handleDateClick.bind(this)}
          userDay={this.determineIsItHasUserDay()}
        />
      </div>
    );
  }

  defaultSelectedPeriod = newPeriod => {
    this.setState(() => ({
      selectedPeriod: new Date(newPeriod)
    }));
  };

  determineIsStepsDisable = () => {
    let currentPoint = new Date(this.state.selectedPeriod);
    let startPoint = new Date(this.props.start);
    let endPoint = new Date(this.props.end);

    this.setState({
      isDisablePrev:
        currentPoint.getMonth() === startPoint.getMonth() &&
        currentPoint.getFullYear() === startPoint.getFullYear()
    });
    this.setState({
      isDisableNext:
        currentPoint.getMonth() === endPoint.getMonth() &&
        currentPoint.getFullYear() === endPoint.getFullYear()
    });
  };

  determineIsItHasUserDay() {
    let date1 = new Date(this.state.selectedPeriod);
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
    let startMonth = this.state.selectedPeriod.getMonth();
    let newState = new Date(this.state.selectedPeriod);

    newState.setMonth(startMonth + step);

    this.setState(() => ({
      selectedPeriod: newState
    }));
  };

  handleDateClick = day => {
    let newDay = new Date(this.state.selectedPeriod);
    newDay.setDate(day);

    let from = new Date(this.props.start);
    from.setDate(from.getDate() - 1);
    let to = new Date(this.props.end);
    to.setDate(to.getDate() + 1);
    if (newDay > from && newDay < to) {
      this.props.changeCurrentInterval(newDay);
      return;
    }
    this.props.changeCurrentInterval(null);
  };
}

export default AppStageDate;
