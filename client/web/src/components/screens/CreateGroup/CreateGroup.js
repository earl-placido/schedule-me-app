import React, { Component } from 'react';
import { Steps, Row, Col, Card, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';  // to prevent eslint from showing errors that props not found

import GroupInfoForm from '../../groups/GroupInfoForm';
import GroupMeetingForm from '../../groups/GroupMeetingForm';
import {updateGroupName, updateGroupDescription, goNextPage, goPreviousPage} from '../../../actions/components/screens/CreateGroup.action';
import "antd/dist/antd.css";

class CreateGroup extends Component {

    // we don't keep the component inside steps because everytime when input changes, the component has to get re-rendered with the
    // redux properties but keeping component tinside steps will prevent the components to get re-rendered thus 
    // making the component frozen
      constructor(props) {
          super(props);
          this.steps = [
            {
              title: 'Group',
            },
            {
              title: 'Meeting',
            },
            {
              title: 'Share',
            },
          ];
      }

      stepsComponent() {
          switch(this.props.currentPage){
              case(0): {
                  return (<GroupInfoForm 
                  handleGroupName={this.props.updateGroupName} 
                  handleGroupDescription={this.props.updateGroupDescription} 
                  groupName={this.props.groupName}
                  groupDescription={this.props.groupDescription}
                  success={this.props.success}/>);
              }
              case(1): {
                  return (<GroupMeetingForm />);
              }
              default:{
                  return null;
              }
          }
      }

      goPreviousPage() {
        this.props.goPreviousPage(this.props.currentPage);
      }

      goNextPage() {
        this.props.goNextPage(this.props.groupName, this.props.currentPage);
      }

    render() {
        const { Step } = Steps;
        const { containerStyle, cardStyle, buttonContainerStyle } = styles;
    return (
            <div >
            
                <Row style={{ padding: 50 }}>
                    <Col span={16} offset={4}>
                        <Steps current={this.props.currentPage}>
                            {this.steps.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>

                    </Col>
                </Row>

                <div style={ containerStyle }>
                    <Card style={ cardStyle }>
                    
                        <Row>
                            <Col span={20} offset={2}>
                                {this.stepsComponent()}
                            </Col>
                        </Row>

                        <Row>
                            <div style={ buttonContainerStyle }>
                                {this.props.currentPage !== 2 &&(
                                <Button id="previousButton"
                                    disabled={this.props.currentPage === 0} 
                                    onClick={this.goPreviousPage.bind(this)}> 
                                        <Icon type="left" />
                                        Previous
                                    </Button>
                                )}

                                {this.props.currentPage !== 1 &&(
                                <Button id="nextButton" 
                                    type="primary" 
                                    onClick={this.goNextPage.bind(this)}> 
                                        Continue
                                        <Icon type="right" />
                                    </Button>
                                )}

                                {this.props.currentPage === 1 &&(
                                <Button id="nextButton" 
                                    type="primary" 
                                    onClick={this.goNextPage.bind(this)}> 
                                        Done
                                        <Icon type="right" />
                                    </Button>
                                )}
                            </div>

                        </Row>

                    </Card>
                </div>
            </div >
        )
    }
}

const styles = {
    containerStyle : {
        display: 'flex', 
        justifyContent: 'center' 
    },

    cardStyle : {
        width: 800
    },

    buttonContainerStyle : {
        display: 'flex', 
        justifyContent: 'space-between'
    }
}

const mapStateToProps = ({ CreateGroupReducer }) => {
    const { groupName, groupDescription, success, currentPage } = CreateGroupReducer;
    return {groupName, groupDescription, success, currentPage};
};

// set this so eslint won't show error prop not found for redux
CreateGroup.propTypes = {
    groupName: PropTypes.any,
    groupDescription: PropTypes.any,
    success: PropTypes.any,
    currentPage: PropTypes.any,
    updateGroupName: PropTypes.func,
    updateGroupDescription: PropTypes.func,
    goNextPage: PropTypes.func,
    goPreviousPage: PropTypes.func
};

export default connect(mapStateToProps, {updateGroupName, updateGroupDescription, goNextPage, goPreviousPage})(CreateGroup);
