import React, {Component} from 'react';

import {Text, FlatList} from 'react-native';
import {
  Container,
  CardItem,
  Body,
  View,
  Content,
  Card,
  Icon,
  Left,
} from 'native-base';

import PropTypes from 'prop-types';

const groupList = [
  {
    GroupId: '1',
    GroupName: 'Tallest Poppy',
    GroupDescription: 'Hipster food',
  },
  {
    GroupId: '2',
    GroupName: 'Stellas',
    GroupDescription: '#notMyStellas',
  },
  {
    GroupId: '3',
    GroupName: 'Dowon',
    GroupDescription: 'Korean food',
  },
];

export default class GroupList extends Component {
  render() {
    return (
      <Container>
        <View>
          <CardItem header boardered>
            <Body style={{alignItems: 'center'}}>
              <Text style={({fontWeight: 'bold'}, {fontSize: 20})}>
                Your Groups
              </Text>
            </Body>
          </CardItem>
        </View>

        <Content>
          <Card style={{flexDirection: 'column'}}>
            <FlatList
              showsHorizontalScrollIndicator={true}
              data={groupList}
              renderItem={({item}) => (
                <View>
                  <CardItem
                    header
                    button
                    bordered
                    onPress={() =>
                      this.props.navigation.navigate('Group Detail', {
                        codeNum: item.GroupId,
                      })
                    }>
                    <Left style={{flex: 0.5}}>
                      <Icon name="paw" />
                    </Left>
                    <Body style={{flex: 4}}>
                      <Text>{item.GroupName}</Text>
                      <Text>{item.GroupDescription}</Text>
                    </Body>
                  </CardItem>
                </View>
              )}
              keyExtractor={item => item.id}
            />
          </Card>
        </Content>
      </Container>
    );
  }
}

GroupList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
