import React, { Component } from "react";
import moment from "moment";
import PropTypes from "prop-types";

class MeetingTimeModal extends Component {
  state = { currentSelected: null };

  handleClick(index) {
    this.setState({ currentSelected: index });
    this.props.selectOptimalTime(this.props.optimalTimes[index]);
  }

  render() {
    const optimalTimesStrings = this.props.optimalTimes.map(optimalTime => {
      const timeInformation = optimalTime[0].split(":");
      const currentDate = timeInformation[0];

      const timeRange = timeInformation[1].split("_");
      const startTime = parseFloat(timeRange[0]).toFixed(2);
      const endTime = parseFloat(timeRange[1]).toFixed(2);
      const startArray = startTime.split(".");
      const endArray = endTime.split(".");
      const startTimeString = moment({
        hour: startArray[0],
        minute: startArray[1]
      }).format("h:mm a");
      const endTimeString = moment({
        hour: endArray[0],
        minute: endArray[1]
      }).format("h:mm a");
      const count = optimalTime[1];
      const theDate = moment(currentDate).format("dddd, MMMM Do YYYY");
      const meetingDateString = `${theDate}`;
      const meetingRangeString = `${startTimeString} - ${endTimeString}`;
      const availableString = `${count} available`;

      return [meetingDateString, meetingRangeString, availableString];
    });
    return (
      <div>
        <h2 style={{ textAlign: "center", marginTop: 10, marginBottom: 30 }}>
          Choose a meeting time
        </h2>
        {optimalTimesStrings.map((optimalTimesString, index) => {
          return (
            <div
              id="meeting-time-display"
              key={index}
              style={{
                display: "flex",
                width: "90%",
                margin: "0 auto",
                alignContent: "center",
                justifyContent: "center",
                backgroundColor:
                  this.state.currentSelected === index && "#add8e6"
              }}
              onClick={this.handleClick.bind(this, index)}
            >
              <h3
                className="optimal-time-display"
                style={{
                  display: "inline",
                  textAlign: "left",
                  width: "30%",
                  marginRight: 50
                }}
              >
                {optimalTimesString[0]}
                <br />
                {optimalTimesString[1]}
              </h3>
              <h3
                className="optimal-time-display"
                style={{ display: "inline", width: "20%", textAlign: "right" }}
              >
                {optimalTimesString[2]}
              </h3>
            </div>
          );
        })}
      </div>
    );
  }
}

MeetingTimeModal.propTypes = {
  optimalTimes: PropTypes.any,
  selectOptimalTime: PropTypes.func
};

export default MeetingTimeModal;
