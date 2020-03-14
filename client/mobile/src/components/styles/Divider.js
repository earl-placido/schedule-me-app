import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from 'native-base';
import PropTypes from 'prop-types';

export default class Divider extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.rowStyle}>
          <View style={styles.lineStyle} />

          <Text style={styles.textStyle}>{this.props.message}</Text>

          <View style={styles.lineStyle} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  rowStyle: {
    flexDirection: 'row',
  },
  textStyle: {
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 5,
    paddingHorizontal: 5,
    fontSize: 15,
  },
  lineStyle: {
    backgroundColor: 'black',
    marginTop: 5,
    marginBottom: 5,
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
});

Divider.propTypes = {
  message: PropTypes.any,
};
