import React, {Component} from 'react';
import {StyleSheet, ToastAndroid} from 'react-native';
import {View, Button, Text} from 'native-base';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Login from '../popups/Login';
import CreateAccount from '../popups/CreateAccount';

class Main extends Component {
  render() {
    return (
      <View>
        <Login navigation={this.props.navigation} />

        <CreateAccount navigation={this.props.navigation} />

        <Button
          large
          style={styles.buttonStyle}
          onPress={() =>
            ToastAndroid.show('This is not yet available', ToastAndroid.SHORT)
          }>
          <Text>Continue as Guest</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalStyle: {
    padding: 20,
  },
  buttonStyle: {
    justifyContent: 'center',
    marginVertical: 25,
    marginHorizontal: 50,
  },
});

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

Main.propTypes = {
  navigation: PropTypes.any,
  navigate: PropTypes.func,
  isAuthenticated: PropTypes.any,
};

export default connect(mapStateToProps, {})(Main);
