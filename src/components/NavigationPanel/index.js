import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helpers from '../../helpers';
import './style.css';


class NavigationPanel extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      period, buttonClick, isDisableNext, isDisablePrev,
    } = this.props;

    return (<div className="navigationPanel__selectPeriod">
      <button
        type="button"
        className="navigationPanel__changePeriod"
        id="previous"
        onClick={
          buttonClick
        }
        disabled={
          isDisablePrev
        }
        style={isDisablePrev ? { cursor: 'no-drop' } : { cursor: 'pointer' }}>
        Prev
      </button>
      <div className="navigationPanel__periodInfo">
        { Helpers.createDateString(period, false) }
      </div>
      <button
        type="button"
        className="navigationPanel__changePeriod"
        id="next"
        onClick={
        buttonClick
        }
        disabled={
          isDisableNext
        }
        style={isDisableNext ? { cursor: 'no-drop' } : { cursor: 'pointe' }}>
        Next
      </button>
    </div>
    );
  }
}

NavigationPanel.propTypes = {
  isDisablePrev: PropTypes.bool.isRequired,
  isDisableNext: PropTypes.bool.isRequired,
  buttonClick: PropTypes.func.isRequired,
  period: PropTypes.instanceOf(Date).isRequired,
};

export default NavigationPanel;
