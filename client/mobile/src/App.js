import React, { Component } from 'react';
import { Dimensions, Image, View, StyleSheet, Text, Linking } from 'react-native';

export default class App extends Component {
  render() {
    return (
      <View style = {styles.app}>
        <View style = {styles.appHeader}>
          <Image
            style={styles.logo}
            source={require('./assets/icon.png')}
          />
          <Text style = {styles.editText}>Edit src/App.js and save to reload.</Text>
          <Text style = {styles.learnText} onPress={() => {Linking.openURL('https://reactjs.org')}}>Learn React</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1, 
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282c34'
  },
  editText: {
    paddingTop: 100,
    color: 'white',
    textAlign: 'center',
    fontSize: 20
  },
  learnText: {
    paddingTop: 30,
    color: '#61dafb',
    textAlign: 'center',
    fontSize: 20,
    textDecorationLine: 'underline'
  },
  logo: {
    width: Dimensions.get('window').width, 
    height: Dimensions.get('window').height/3,
    resizeMode: 'contain'
  },
});