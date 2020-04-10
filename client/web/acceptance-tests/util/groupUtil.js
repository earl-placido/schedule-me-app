const generateGroup = () => {
  let generatedgroup = {
    groupName: `groupName_${Math.random()
      .toString(36)
      .slice(2)}`,
    groupDesc: `groupDesc_${Math.random()
      .toString(36)
      .slice(2)}`,
    meetingDuration: `01:00`,
    meetingFrequency: `1`,
    meetingLocation: `meetingLocation_${Math.random()
      .toString(36)
      .slice(2)}`
  };

  return generatedgroup;
};

module.exports = {
  generateGroup
};
