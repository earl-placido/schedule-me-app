import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Text, Container} from 'native-base';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Login from '../login/Login';
import CreateAccount from '../login/CreateAccount';

class Home extends Component {
  render() {
    return (
      <Container style={styles.container} accessibilityLabel={'HomeContainer'}>
        <Text style={styles.title}>Schedule Me Up</Text>
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
