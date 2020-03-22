import React, { Component } from 'react';

const NUMBER_TO_DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

class MeetingTimeModal extends Component {

    state = {currentSelected: null};

    handleClick(index) {
        this.setState({ currentSelected: index });
        return 
    }

    render() {
        const optimalTimesStrings = this.props.optimalTimes.map((optimalTime, index) => {
            const timeInformation = optimalTime[0].split(":");
            const currentDay = timeInformation[0];
            const timeRange = timeInformation[1].split("_");
            
            const startTime = timeRange[0];
            const endTime = timeRange[1];
            const count = optimalTime[1];

            const currentDayString = NUMBER_TO_DAY[currentDay];

            const meetingString = `${currentDayString} ${startTime} - ${endTime}`;
            const availableString = `${count} available`;

            return [meetingString, availableString];
        });
        return (
            <div>
                <h2 style={{textAlign: 'center', marginTop: 10, marginBottom: 20}}>Choose a meeting time</h2>
                        {optimalTimesStrings.map((optimalTimesString, index) => {
                            return (<div style={{display: 'flex', width: '50%', margin: '0 auto', alignContent: 'center', justifyContent: 'center', backgroundColor: this.state.currentSelected === index && '#add8e6'}} onClick={this.handleClick.bind(this, index)}>
                                <h3 style={{display: "inline", textAlign: 'right', width: '30%', marginRight: 50}}>{optimalTimesString[0]}</h3>
                                <h3 style={{display: "inline", width: '30%', textAlign: 'left'}}>{optimalTimesString[1]}</h3>
                            </div>);
                        })
                        }
            </div>
        );
    }
}

export default MeetingTimeModal;