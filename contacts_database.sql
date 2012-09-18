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
  `OfficeNumber` varchar(45) NULL,
  `MobileNumber` varchar(45) NULL,
  `HomeNumber` varchar(45) NULL,
  `Latitude` float NULL,
  `Longitude` float NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1
$$


INSERT INTO contact VALUES (1, 'Oscar', 'Marin', NULL, '+506 2220-1020', '+506 8830-4050', NULL, 10.036099, -84.081813);
$$

INSERT INTO contact VALUES (2, 'Pamela', 'Molina', NULL, '+506 2220-3040', '+506 8830-6070', NULL, 10.036099, -84.081813);
$$
