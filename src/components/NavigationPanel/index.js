import React, { PureComponent } from "react";
import Helpers from "../../helpers";
import "./style.css";

class NavigationPanel extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {}

  componentDidMount() {}

  render() {
    const { period, buttonClick, isDisableNext, isDisablePrev } = this.props;

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
          {Helpers.createDateString(period, false)}
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
}

export default NavigationPanel;
