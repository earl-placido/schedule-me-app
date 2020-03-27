import {FloatingAction} from 'react-native-floating-action';
import Dialog from 'react-native-dialog';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import React, {Component} from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {Body, Container, Content, Card, CardItem, Icon} from 'native-base';
import Modal from 'react-native-modal';
import InputAvailabilityModal from '../../inputavailability/InputAvailabilityModal';

import {
  getGroup,
  toggleInputAvailability,
} from '../../../actions/screens/GetGroup.action';
import {getGroupMembers} from '../../../actions/screens/GetGroupMembers.action';

const actions = [
  {
    text: 'Input Your Availability',
    icon: require('../../../assets/personIcon.png'),
    name: 'inputAvalibility',
    position: 1,
  },
];

class GroupDetail extends Component {
  componentDidMount() {
    this.props.getGroup(this.props.route.params.codeNum);
    this.props.getGroupMembers(this.props.route.params.codeNum);
  }

  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
      currUser: {
        UserFName: 'INVALID USER',
        UserLName: 'INVALID USER',
        UserEmail: 'INVALID USER',
      },
    };
  }
  showDialog(user) {
    this.setState({currUser: user, dialogVisible: true});
  }

  handleClose = () => {
    this.setState({dialogVisible: false});
  };

  render() {
    return (
      <Container>
        {/* Display Group Details */}
        <View style={styles.headerStyle}>
          <CardItem header>
            <Body style={{alignItems: 'center'}}>
              <View style={{paddingBottom: 10}}>
                <Text style={styles.titleStyle}>
                  Group: {this.props.group.GroupName}
                </Text>
              </View>

              <Text>GroupID: {this.props.group.GroupId}</Text>
              <Text>Meeting Duration: {this.props.group.MeetingDuration}</Text>
              <Text>
                Meeting Location:{' '}
                {this.props.group.MeetingLocation
                  ? this.props.group.MeetingLocation
                  : 'Not Specified'}
              </Text>
              <Text>
                Meeting Frequency:{' '}
                {this.props.group.MeetingFrequency
                  ? this.props.group.MeetingFrequency
                  : 'Not Specified'}
              </Text>
            </Body>
          </CardItem>
        </View>

        {/* Display Group Members */}
        <CardItem>
          <Body style={{alignItems: 'center'}}>
            <Text style={styles.subHeaderStyle}>Group Members</Text>
          </Body>
        </CardItem>

        <Content>
          <Card>
            <FlatList
              showsHorizontalScrollIndicator={true}
              data={this.props.groupMembers}
              renderItem={({item}) => (
                <View>
                  <CardItem header button onPress={() => this.showDialog(item)}>
                    <Icon name="person" />
                    <Body>
                      <Text>
                        {item.UserFName} {item.UserLName}{' '}
                      </Text>
                    </Body>
                  </CardItem>
                </View>
              )}
              keyExtractor={item => item.id}
            />
          </Card>
        </Content>

        <FloatingAction
          actions={actions}
          onPressItem={() =>
            this.props.toggleInputAvailability(
              this.props.isInputAvailabilityVisible,
            )
          }
        />

        <Modal
          isVisible={this.props.isInputAvailabilityVisible}
          onBackdropPress={() => {
            this.props.toggleInputAvailability(
              this.props.isInputAvailabilityVisible,
            );
          }}>
          <InputAvailabilityModal groupId = {this.props.route.params.codeNum} />
        </Modal>

        <Dialog.Container
          onBackdropPress={this.handleClose}
          visible={this.state.dialogVisible}>
          <Icon
            style={{padding: 10, position: 'absolute', right: 10}}
            type="FontAwesome"
            name="close"
            onPress={this.handleClose}
          />

          <Dialog.Title>{this.state.currUser.UserFName}</Dialog.Title>

          <Dialog.Description>
            <Text style={{fontWeight: 'bold'}}>Full Name: </Text>{' '}
            {this.state.currUser.UserFName} {this.state.currUser.UserLName}{' '}
            {'\n'}
            <Text style={{fontWeight: 'bold'}}>Email: </Text>
            {this.state.currUser.UserEmail}
          </Dialog.Description>
          <Dialog.Button label="ChangeAvailability" />
        </Dialog.Container>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'column',
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  subHeaderStyle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

const mapStateToProps = ({GetGroupReducer, GetGroupMembersReducer}) => {
  const {group, isInputAvailabilityVisible} = GetGroupReducer;
  const {groupMembers} = GetGroupMembersReducer;
  return {group, isInputAvailabilityVisible, groupMembers};
};

GroupDetail.propTypes = {
  route: PropTypes.any,
  params: PropTypes.any,
  codeNum: PropTypes.any,
  group: PropTypes.any,
  isInputAvailabilityVisible: PropTypes.any,

  groupMembers: PropTypes.array,
  getGroup: PropTypes.func,
  getGroupMembers: PropTypes.func,
  toggleInputAvailability: PropTypes.func,
};

export default connect(mapStateToProps, {
  getGroupMembers,
  getGroup,
  toggleInputAvailability,
})(GroupDetail);
