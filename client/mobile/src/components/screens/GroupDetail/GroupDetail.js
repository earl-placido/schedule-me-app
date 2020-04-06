import {FloatingAction} from 'react-native-floating-action';
import Dialog from 'react-native-dialog';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import React, {Component} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {
  View,
  Body,
  Container,
  Content,
  Card,
  CardItem,
  Icon,
  Button,
  Text,
  Spinner,
} from 'native-base';
import Modal from 'react-native-modal';
import InputAvailabilityModal from '../../inputavailability/InputAvailabilityModal';
import MeetingModal from './MeetingModal';

import {
  getGroup,
  toggleInputAvailability,
} from '../../../actions/GetGroup.action';
import {getGroupMembers} from '../../../actions/GetGroupMembers.action';
import {setAvailabilities} from '../../../actions/InputAvailability.action';
import {
  getGroupOptimalTime,
  selectMeeting,
  getAllOptimalTimes,
  toggleMeetingModal,
  getSelfMember,
} from '../../../actions/GetOptimalMeetingTime.action';
import {Alert} from 'react-native';

const actions = [
  {
    text: 'Input Your Availability',
    icon: require('../../../assets/personIcon.png'),
    name: 'inputAvalibility',
    position: 1,
  },
];

class GroupDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
      currUser: {
        UserFName: 'INVALID USER',
        UserLName: 'INVALID USER',
        UserEmail: 'INVALID USER',
      },
      finishedLoadingGroupDetails: false,
    };
  }

  async componentDidMount() {
    try {
      await this.loadGroupDetails();
      this.setState({
        finishedLoadingGroupDetails: true,
      });
    } catch (err) {
      Alert.alert('Cannot retrieve group details');
    }
  }

  async loadGroupDetails() {
    await this.props.getGroup(this.props.route.params.codeNum);
    await this.props.getGroupMembers(this.props.route.params.codeNum);
    await this.props.setAvailabilities(this.props.route.params.codeNum);
    await this.props.getSelfMember(this.props.route.params.codeNum);
    await this.props.getGroupOptimalTime(this.props.route.params.codeNum);
  }

  showDialog(user) {
    this.setState({currUser: user, dialogVisible: true});
  }

  handleClose = () => {
    this.setState({dialogVisible: false});
  };

  currentMeetingTime() {
    return (
      <View>
        <Text
          style={{textAlign: 'center', fontWeight: 'bold', paddingBottom: 5}}>
          Meeting Time
        </Text>
        {this.props.meetings &&
          this.props.meetings.map((meeting, index) => {
            return (
              <View key={index}>
                <Text style={styles.timeStyle}>
                  {meeting.meetingTimeString ||
                    'Meeting time is currently empty'}
                </Text>
                {this.props.selfMember &&
                  this.props.selfMember.MemberRole === 'AD' && (
                    <Button
                      small
                      block
                      style={{justifyContent: 'center', marginTop: 10}}
                      onPress={() => this.getOptimalTime(meeting)}>
                      <Text>
                        {meeting.meetingTimeString
                          ? 'Change time'
                          : 'Pick a time'}
                      </Text>
                    </Button>
                  )}
              </View>
            );
          })}
      </View>
    );
  }

  getOptimalTime(selectedMeeting) {
    this.props.selectMeeting(selectedMeeting);
    this.props.getAllOptimalTimes(this.props.route.params.codeNum);
    this.props.toggleMeetingModal(this.props.isMeetingModalVisible);
  }

  render() {
    return (
      <Container>
        {!this.state.finishedLoadingGroupDetails && <Spinner color="blue" />}
        {this.state.finishedLoadingGroupDetails && (
          <Container>
            <View style={styles.headerStyle}>
              <CardItem header>
                <Body style={{alignItems: 'center'}}>
                  <View style={{paddingBottom: 10}}>
                    <Text style={styles.titleStyle}>
                      Group: {this.props.group.GroupName}
                    </Text>
                  </View>

                  <Text>GroupID: {this.props.group.GroupId}</Text>
                  <Text>
                    Meeting Duration: {this.props.group.MeetingDuration}
                  </Text>
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

            <View>
              <CardItem>
                <Body style={{alignItems: 'center'}}>
                  {this.currentMeetingTime()}
                </Body>
              </CardItem>
            </View>

            <Modal
              isVisible={this.props.isMeetingModalVisible}
              onBackdropPress={() =>
                this.props.toggleMeetingModal(this.props.isMeetingModalVisible)
              }>
              <MeetingModal />
            </Modal>

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
                      <CardItem
                        header
                        button
                        onPress={() => this.showDialog(item)}>
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
            <Modal isVisible={this.props.isInputAvailabilityVisible}>
              <InputAvailabilityModal />
            </Modal>

            {/* Pressing on a user displays a modal with more information about the user */}
            <Dialog.Container
              onBackdropPress={this.handleClose}
              visible={this.state.dialogVisible}>
              <Icon
                style={{padding: 10, position: 'absolute', right: 10}}
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
            </Dialog.Container>
          </Container>
        )}
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
  timeStyle: {
    // fontWeight: 'bold',
    fontSize: 15,
  },
  subHeaderStyle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

const mapStateToProps = ({
  GetGroupReducer,
  GetGroupMembersReducer,
  GetOptimalMeetingTimeReducer,
}) => {
  const {group, isInputAvailabilityVisible} = GetGroupReducer;
  const {groupMembers} = GetGroupMembersReducer;
  const {
    meetings,
    isMeetingModalVisible,
    selfMember,
  } = GetOptimalMeetingTimeReducer;
  return {
    group,
    isInputAvailabilityVisible,
    groupMembers,
    meetings,
    isMeetingModalVisible,
    selfMember,
  };
};

GroupDetail.propTypes = {
  route: PropTypes.any,
  params: PropTypes.any,
  codeNum: PropTypes.any,
  group: PropTypes.any,
  isInputAvailabilityVisible: PropTypes.any,
  meetings: PropTypes.any,
  isMeetingModalVisible: PropTypes.any,
  selfMember: PropTypes.any,

  groupMembers: PropTypes.array,
  getGroup: PropTypes.func,
  getGroupMembers: PropTypes.func,
  toggleInputAvailability: PropTypes.func,
  setAvailabilities: PropTypes.func,
  getGroupOptimalTime: PropTypes.func,
  selectMeeting: PropTypes.func,
  getAllOptimalTimes: PropTypes.func,
  toggleMeetingModal: PropTypes.func,
  getSelfMember: PropTypes.func,
};

export default connect(mapStateToProps, {
  getGroupMembers,
  getGroup,
  toggleInputAvailability,
  setAvailabilities,
  getGroupOptimalTime,
  selectMeeting,
  getAllOptimalTimes,
  toggleMeetingModal,
  getSelfMember,
})(GroupDetail);
