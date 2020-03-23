import React, {Component} from 'react';
import {Calendar} from 'react-native-calendars';
import {View, Button, Text} from 'native-base';

export default class InputAvailabilityModal extends Component {
  render() {
    return (
        <View>
            <Calendar>

            </Calendar> 
            <View>
                <Button block>
                    <Text>
                        Done
                    </Text>
                </Button>
            </View>
        </View>
    );
  }
}
