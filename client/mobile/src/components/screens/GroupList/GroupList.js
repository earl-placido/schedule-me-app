import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Text, FlatList} from 'react-native';
import {
  Container,
  CardItem,
  Body,
  View,
  Content,
  Card,
  Icon,
} from 'native-base';

import {getGroupList} from '../../../actions/screens/GroupList.action';

class GroupList extends Component {
  componentDidMount() {
    this.props.getGroupList();
  }

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
              data={this.props.groupList}
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
                    <Icon name="people" />
                    <Body style={{paddingLeft: 10}}>
                      <Text>{item.GroupName}</Text>
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

const mapStateToProps = ({GroupListReducer}) => {
  const {groupList} = GroupListReducer;
  return {groupList};
};

GroupList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  groupList: PropTypes.array,
  getGroupList: PropTypes.func,
};

export default connect(mapStateToProps, {getGroupList})(GroupList);
