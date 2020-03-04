SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `Example`;
CREATE TABLE `Example` 
(
  ExampleID INT NOT NULL,
  ExampleData varchar(50),
  PRIMARY KEY (ExampleID)
);

DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` 
(
  UserId INT NOT NULL AUTO_INCREMENT,
  UserName NVARCHAR(320) NOT NULL,
  UserEmail NVARCHAR(320) NOT NULL,
  PRIMARY KEY (UserId),
  CONSTRAINT UQ_User_UserEmail UNIQUE (UserEmail)

);

DROP TABLE IF EXISTS `Group`;
CREATE TABLE `Group`
(
  GroupId INT NOT NULL AUTO_INCREMENT,
  GroupName NVARCHAR(45) NOT NULL,
  GroupDescription NVARCHAR(200) NULL,
  GroupOwnerId INT NOT NULL,
  LastUpdated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  MeetingId INT NOT NULL,
  PRIMARY KEY (GroupId, GroupOwnerId),
  CONSTRAINT FK_Group_UserId FOREIGN KEY (GroupOwnerId) REFERENCES `User`(UserId),
  CONSTRAINT FK_Group_MeetingId FOREIGN KEY (MeetingId) REFERENCES `Meeting`(MeetingId)
);

ALTER TABLE `Group` AUTO_INCREMENT = 1000000;

DROP TABLE IF EXISTS `GroupMember`;
CREATE TABLE `GroupMember`
(
  GroupMemberId INT NOT NULL AUTO_INCREMENT,
  GroupId INT NOT NULL,
  UserId INT NULL,
  MemberRole NVARCHAR(2) NULL,
  PRIMARY KEY (GroupMemberId),
  CONSTRAINT FK_GroupMember_GroupId FOREIGN KEY (GroupId) REFERENCES `Group`(GroupId) ON DELETE CASCADE,
  CONSTRAINT FK_GroupMember_UserId FOREIGN KEY (UserId) REFERENCES `User`(UserId) ON DELETE CASCADE
);

DROP TABLE IF EXISTS `GroupMemberEvent`;
CREATE TABLE `GroupMemberEvent`
(
  GroupMemberEventId INT NOT NULL AUTO_INCREMENT,
  GroupMemberId INT NOT NULL,
  EventName NVARCHAR(100) NOT NULL,
  StartTime DATETIME NOT NULL,
  EndTime DATETIME NOT NULL,
  PRIMARY KEY (GroupMemberEventId),
  CONSTRAINT FK_GroupMemberEvent_GroupMemberEventId FOREIGN KEY (GroupMemberId) REFERENCES `GroupMember` (GroupMemberId)
);

DROP TABLE IF EXISTS `Availability`;
CREATE TABLE `Availability`
(
  AvailabilityId INT NOT NULL AUTO_INCREMENT,
  GroupMemberId INT NOT NULL,
  StartTime DATETIME NOT NULL,
  EndTime DATETIME NOT NULL, 
  PRIMARY KEY (AvailabilityId),
  CONSTRAINT FK_Availability_GroupMemberId FOREIGN KEY (GroupMemberId) REFERENCES `GroupMember`(GroupMemberId)
);

DROP TABLE IF EXISTS `Meeting`;
CREATE TABLE `Meeting`
(
  MeetingId INT NOT NULL AUTO_INCREMENT,
  MeetingDuration TIME NULL,
  MeetingFrequency NVARCHAR(2) NULL,
  MeetingLocation NVARCHAR(100) NULL,
  LastUpdated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (MeetingId)
);

DROP TABLE IF EXISTS `OptimalAvailability`;
CREATE TABLE `OptimalAvailability`
(
  OptimalAvailabilityId INT NOT NULL AUTO_INCREMENT,
  MeetingId INT NOT NULL,
  StartTime DATETIME NOT NULL,
  EndTime DATETIME NOT NULL,
  LastUpdated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (OptimalAvailabilityId),
  CONSTRAINT FK_OptimalAvailability_MeetingId FOREIGN KEY (MeetingId) REFERENCES `Meeting`(MeetingId)
);

SET FOREIGN_KEY_CHECKS=1;

INSERT INTO `User` (`UserName`, `UserEmail`) VALUES ('TestUser', 'TestEmail@schedulemeup.ca');