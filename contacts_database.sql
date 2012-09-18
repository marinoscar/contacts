delimiter $$

CREATE DATABASE `contacts` /*!40100 DEFAULT CHARACTER SET latin1 */
$$

USE contacts
$$

CREATE TABLE `contact` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `LastName` varchar(45) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1
$$

CREATE TABLE `location` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `ContactId` int(11) NOT NULL,
  `Latitude` float NOT NULL,
  `Longitude` float NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Name_UNIQUE` (`Name`, `ContactId`),
  KEY `FK_Location_Contact_idx` (`ContactId`),
  CONSTRAINT `FK_Location_Contact` FOREIGN KEY (`ContactId`) REFERENCES `contact` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 
$$

CREATE TABLE `phone` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `ContactId` int(11) NOT NULL,
  `Number` varchar(45) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Name_UNIQUE` (`Name`, `ContactId`),
  KEY `FK_Phone_Contact_idx` (`ContactId`),
  CONSTRAINT `FK_Phone_Contact` FOREIGN KEY (`ContactId`) REFERENCES `contact` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1
$$

INSERT INTO contact (Id, Name, LastName) VALUES (1, 'Oscar', 'Marin');
$$


INSERT INTO location (Name, ContactId, Latitude, Longitude) VALUES ('Home', 1, 10.036099, -84.081813);
$$
INSERT INTO phone (Name, ContactId, Number) VALUES ('Mobile', 1, '8880-1020');
$$

INSERT INTO contact (Id, Name, LastName) VALUES (2, 'Pamela', 'Molina');
$$

INSERT INTO location (Name, ContactId, Latitude, Longitude) VALUES ('Home', 2, 10.036099, -84.081813);
$$
INSERT INTO phone (Name, ContactId, Number) VALUES ('Mobile', 2, '8890-3040');
$$
