import {FloatingAction} from 'react-native-floating-action';
import Dialog from 'react-native-dialog';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

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
import InputAvailabilityModal from '../inputavailability/InputAvailabilityModal';
import MeetingModal from '../meeting/MeetingModal';

import {getGroup, toggleInputAvailability} from '../../actions/GetGroup.action';
import {getGroupMembers} from '../../actions/GetGroupMembers.action';
import {setAvailabilities} from '../../actions/InputAvailability.action';
import {
  getGroupOptimalTime,
  selectMeeting,
  getAllOptimalTimes,
  toggleMeetingModal,
  getSelfMember,
} from '../../actions/GetOptimalMeetingTime.action';
import {Alert} from 'react-native';

const actions = [
  {
    text: 'Input Your Availability',
    icon: <Icon style={{color: 'white'}} name="person"></Icon>,
    name: 'inputAvailability',
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

  formatDate(date) {
    if (date === undefined) return;

    let dateArray = date.replace(/\s/g, '').split(/\W/g);
    let formattedDate = moment({
      year: dateArray[1],
      month: dateArray[2],
      day: dateArray[3],
    }).format('dddd, MMMM Do YYYY');
    let formattedStartTime = moment({
      hour: dateArray[6],
      minute: dateArray[7],
    }).format('h:mm a');
    let formattedEndTime = moment({
      hour: dateArray[8],
      minute: dateArray[9],
    }).format('h:mm a');

    let formattedDateLastUpdated = moment({
      year: dateArray[11],
      month: dateArray[12],
      day: dateArray[13],
    }).format('MMMM Do YYYY');

    let formattedHourLastUpdated = moment({
      hour: dateArray[14],
      minute: dateArray[15],
    }).format('h:mm a');

    let formattedTime = `${formattedStartTime} - ${formattedEndTime}`;
    let formattedTimeLastUpdated = `Last Updated: ${formattedDateLastUpdated} ${formattedHourLastUpdated}`;
    return (
      formattedDate + ' ' + formattedTime + '\n\n' + formattedTimeLastUpdated
    );
  }

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
                  {this.formatDate(meeting.meetingTimeString) ||
                    'No meeting time selected'}
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

  removeSeconds(timeString) {
    if (timeString) {
      return timeString.substring(0, timeString.lastIndexOf(':'));
    }
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
                  <View style={{paddingBottom: 15}}>
                    <Text style={styles.titleStyle}>
                      Group: {this.props.group.GroupName}
                    </Text>
                    {this.props.group.GroupDescription && (
                      <Text style={{textAlign: 'center'}}>
                        {this.props.group.GroupDescription}
                      </Text>
                    )}
                  </View>
                  <View>
                    <Text style={styles.propertyStyle}>
                      <Text style={styles.boldStyle}>Meeting Duration:</Text>
                      <Text>
                        {' '}
                        {this.removeSeconds(this.props.group.MeetingDuration)}
                      </Text>
                    </Text>
                    <Text style={styles.propertyStyle}>
                      <Text style={styles.boldStyle}>Meeting Frequency:</Text>
                      <Text>
                        {' '}
                        {this.props.group.MeetingFrequency
                          ? this.props.group.MeetingFrequency
                          : 'Not Specified'}
                      </Text>
                    </Text>
                    <Text style={styles.propertyStyle}>
                      <Text style={styles.boldStyle}>Meeting Location:</Text>
                      <Text>
                        {' '}
                        {this.props.group.MeetingLocation
                          ? this.props.group.MeetingLocation
                          : 'Not Specified'}
                      </Text>
                    </Text>
                  </View>
                </Body>
              </CardItem>
            </View>
            <View style={styles.headerStyle}>
              <Text style={styles.shareCodeStyle}>
                Share this code for others to join the group:
              </Text>
              <Text style={styles.codeStyle}>{this.props.group.GroupId}</Text>
            </View>
            <View>
              <CardItem>
                <Body style={{alignItems: 'center'}}>
                  {this.currentMeetingTime()}
                </Body>
              </CardItem>
            </View>

            <Modal
              id="meeting-modal"
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
            <Modal
              id="availability-modal"
              isVisible={this.props.isInputAvailabilityVisible}>
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
  boldStyle: {
    fontWeight: 'bold',
  },
  codeStyle: {
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 15,
  },
  headerStyle: {
    flexDirection: 'column',
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
  },
  propertyStyle: {
    textAlign: 'left',
  },
  titleStyle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
  },
  timeStyle: {
    // fontWeight: 'bold',
    fontSize: 15,
  },
  shareCodeStyle: {
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 15,
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
