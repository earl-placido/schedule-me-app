import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Container, Footer, Content, Title} from 'native-base';
import {Button, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import Reducers from './Reducers';

import GroupDetail from './components/screen/GroupDetail';
import CreateGroup from './components/screen/CreateGroup';

function HomeScreen({navigation}) {
  return (
    <Container>
      <Button
        title="Go to group details"
        onPress={() => navigation.navigate('Group Detail')}
      />
      <CreateGroup />
      <Content />
    </Container>
  );
}

function DetailsScreen({navigation}) {
  return (
    <Container>
      <Button
        title="Go to create group"
        onPress={() => navigation.navigate('Create Group')}
      />
      <GroupDetail />
      <Content />
    </Container>
  );
}

DetailsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={createStore(Reducers, {}, applyMiddleware(thunk))}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Create Group" component={HomeScreen} />
          <Stack.Screen name="Group Detail" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>

      <Footer style={styles.headerStyle}>
        <Title>schedule-me-up</Title>
      </Footer>
    </Provider>
  );
}

export default App;

const styles = StyleSheet.create({
  headerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
