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

import {getGroupList} from '../../actions/GetGroupList.action';

class GroupList extends Component {
  componentDidMount() {
    this.props.getGroupList();
  }

  render() {
    return (
      <Container>
        <View>
          <CardItem header boardered accessibilityLabel={'Your Groups'}>
            <Body style={{alignItems: 'center'}}>
              <Text style={({fontWeight: 'bold'}, {fontSize: 20})}>
                Your Groups
              </Text>
            </Body>
          </CardItem>
        </View>

        {/* Display Groups */}
        <Content>
          {this.props.groupList.length > 0 ? (
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
                      onPress={() => {
                        this.props.navigation.push('Group Detail', {
                          codeNum: item.GroupId,
                        });
                        this.props.navigation.navigate('Group Detail');
                      }}>
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
          ) : (
            <View>
              <Body style={{alignItems: 'center'}}>
                <Text>Your group list is empty</Text>
              </Body>
            </View>
          )}
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
    push: PropTypes.func.isRequired,
  }).isRequired,
  groupList: PropTypes.array,
  getGroupList: PropTypes.func,
};

export default connect(mapStateToProps, {getGroupList})(GroupList);
