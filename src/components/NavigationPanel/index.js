import React, { PureComponent } from "react";
import "./style.css";

class NavigationPanel extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ]
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  

  render() {
    const { period, buttonClick, isDisableNext, isDisablePrev } = this.props;

    // const body = this.state.isOpen && <section>{article.text}</section>

    return (
      <div className="navigationPanel__selectPeriod">
        <button
          className="navigationPanel__changePeriod"
          id="previous"
          ref="previous"
          onClick={buttonClick}
          disabled={isDisablePrev}
          style={isDisablePrev ? { cursor: "no-drop" } : { cursor: "pointer" }}
        >
          Prev
        </button>
        <div className="navigationPanel__periodInfo">
          {this.state.months[period.getMonth()]} {period.getFullYear()}
        </div>
        <button
          className="navigationPanel__changePeriod"
          id="next"
          ref="next"
          onClick={buttonClick}
          disabled={isDisableNext}
          style={isDisableNext ? { cursor: "no-drop" } : { cursor: "pointer" }}
        >
          Next
        </button>
      </div>
    );
  }

  defaultSelectedPeriod = () => {
    this.setState({
      selectedPeriod: `${
        this.state.months[new Date(this.props.current).getMonth()]
      } ${new Date(this.props.current).getFullYear()}`
    });
  };

  defaultSelectedDate = () => {
    this.setState({
      selectedDate: this.props.current
    });
  };
}

export default NavigationPanel;
