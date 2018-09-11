import React, { PureComponent } from "react";
import NavigationPanel from "../NavigationPanel";
import MonthlyCalendar from "../MonthlyCalendar";
import "./style.css";

class AppStageDate extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedPeriod: null,
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
  
      const componentPeriod = (this.props.start > this.state.selectedPeriod) ? this.props.current : this.state.selectedPeriod;
  
    return (
      <div className="appStageDate__box">
        <NavigationPanel
          period={componentPeriod}
          buttonClick={this.handleButtonClick.bind(this)}
          isDisableNext={this.determineIsStepsDisable('next', componentPeriod)}
          isDisablePrev={this.determineIsStepsDisable('prev', componentPeriod)}
        />

        <MonthlyCalendar
          period={componentPeriod}
          chosen={this.props.current}
          dateClick={this.handleDateClick.bind(this)}
          userDay={this.determineIsItHasUserDay(componentPeriod)}
        />
      </div>
    );
  }

  defaultSelectedPeriod = newPeriod => {
    this.setState(() => ({
      selectedPeriod: new Date(newPeriod)
    }));
  };

  determineIsStepsDisable = (step, period) => {
    let currentPoint = new Date(period);
    let startPoint = new Date(this.props.start);
    let endPoint = new Date(this.props.end);

    if(step==="prev"){
       return (currentPoint.getMonth() === startPoint.getMonth() &&
        currentPoint.getFullYear() === startPoint.getFullYear())
    }
   if(step==="next"){
      return (currentPoint.getMonth() === endPoint.getMonth() &&
        currentPoint.getFullYear() === endPoint.getFullYear())
   }
  };

  determineIsItHasUserDay(period) {
    let date1 = new Date(period);
    let date2 = new Date(this.props.current);
    if (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth()
    ) {
      return date2.getDate();
    }
    return null;
  }

  changeState=()=>{
    
    if(this.props.start > this.state.selectedPeriod){
      this.defaultSelectedPeriod(this.props.current)
      this.setState(() => ({
       selectedDate: this.props.current
     }));
     return this.props.current
    }
    return this.state.selectedPeriod
  }

  handleButtonClick = event => {
    let step = event.target.id === "next" ? 1 : -1;
    this.changeState();
    let startMonth = this.state.selectedPeriod.getMonth();
    let newState = new Date(this.state.selectedPeriod);

    newState.setMonth(startMonth + step);

    this.setState(() => ({
      selectedPeriod: newState
    }));
  };

  handleDateClick = day => {
    this.changeState();
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
