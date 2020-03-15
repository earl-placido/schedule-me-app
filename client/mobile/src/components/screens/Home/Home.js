import React, {Component} from 'react';
import {StyleSheet, Alert} from 'react-native';
import {Button, Text, Container} from 'native-base';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Login from '../../login/Login';
import CreateAccount from '../../login/CreateAccount';
import Divider from '../../styles/Divider';

class Home extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Text style={styles.title}>Schedule Me Up</Text>

        <Button
          block
          primary
          style={styles.buttonStyle}
          onPress={() => Alert.alert('This feature is not yet available')}>
          <Text>Continue as Guest</Text>
        </Button>

        <Divider message="or"> </Divider>

        <Login navigation={this.props.navigation} />
        <CreateAccount navigation={this.props.navigation} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonStyle: {
    margin: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#696969',
    textAlign: 'center',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
});

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

Home.propTypes = {
  navigation: PropTypes.any,
  navigate: PropTypes.func,
  isAuthenticated: PropTypes.any,
};

export default connect(mapStateToProps, {})(Home);