SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `Example`;
CREATE TABLE `Example` 
(
  ExampleID INT NOT NULL,
  ExampleData varchar(50),
  PRIMARY KEY (ExampleID)
);

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` 
(
  UserId INT NOT NULL AUTO_INCREMENT,
  UserName NVARCHAR(50) NOT NULL,
  PRIMARY KEY (UserId)
);

DROP TABLE IF EXISTS `Groups`;
CREATE TABLE `Groups`
(
  GroupId INT NOT NULL AUTO_INCREMENT,
  GroupName NVARCHAR(45) NOT NULL,
  GroupDescription NVARCHAR(200) NULL,
  GroupOwnerId INT NOT NULL,
  LastUpdated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  ShareableURL NVARCHAR(10) NOT NULL,
  MeetingDuration TIME NULL,
  MeetingFrequency NVARCHAR(2) NULL,
  MeetingLocation NVARCHAR(100) NULL,
  PRIMARY KEY (GroupId),
  CONSTRAINT FK_Groups_UserId FOREIGN KEY (GroupOwnerId) REFERENCES `Users`(UserId)
);

DROP TABLE IF EXISTS `GroupMemberships`;
CREATE TABLE `GroupMemberships`
(
  GroupMembershipId INT NOT NULL AUTO_INCREMENT,
  GroupId INT NOT NULL,
  UserId INT NOT NULL,
  PRIMARY KEY (GroupMembershipId),
  CONSTRAINT FK_GroupMemberships_GroupId FOREIGN KEY (GroupId) REFERENCES `Groups`(GroupId),
  CONSTRAINT FK_GroupMemberships_UserId FOREIGN KEY (UserId) REFERENCES `Users`(UserId)
);

DROP TABLE IF EXISTS `UserAvailability`;
CREATE TABLE `UserAvailability`
(
  UserAvailabilityId INT NOT NULL AUTO_INCREMENT,
  UserId INT NOT NULL,
  StartTime DATETIME NOT NULL,
  EndTime DATETIME NOT NULL, 
  PRIMARY KEY (UserAvailabilityId),
  CONSTRAINT FK_UserAvailability_UserId FOREIGN KEY (UserId) REFERENCES `Users`(UserId)
);

DROP TABLE IF EXISTS `OptimalAvailability`;
CREATE TABLE `OptimalAvailability`
(
  OptimalAvailabilityId INT NOT NULL AUTO_INCREMENT,
  GroupId INT NOT NULL,
  StartTime DATETIME NOT NULL,
  EndTime DATETIME NOT NULL,
  LastUpdated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (OptimalAvailabilityId),
  CONSTRAINT FK_OptimalAvailability_GroupId FOREIGN KEY (GroupId) REFERENCES `Groups`(GroupId)
);

SET FOREIGN_KEY_CHECKS=1;