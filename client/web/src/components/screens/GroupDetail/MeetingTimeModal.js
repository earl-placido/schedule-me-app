import React, { Component } from 'react';

class MeetingTimeModal extends Component {

    state = {currentSelected: null};

    handleClick(index) {
        this.setState({ currentSelected: index });
        return 
    }

    render() {
        return (
            <div>
                <h2 style={{textAlign: 'center'}}>Choose a meeting time</h2>
                {this.props.optimalTimes.map((optimalTime, index) => {
                    return (
                        <div style={{display: 'flex', alignContent: 'center', justifyContent: 'center', backgroundColor: this.state.currentSelected === index && '#add8e6'}} onClick={this.handleClick.bind(this, index)}>
                            <h3 style={{display: "inline", textAlign: 'right', width: '50%', marginRight: 50}}>{optimalTime[0]}</h3>
                            <h3 style={{display: "inline", width: '50%', textAlign: 'left'}}>{optimalTime[1]}</h3>
                        </div>
                        );
                })}
            </div>
        );
    }
}

export default MeetingTimeModal;