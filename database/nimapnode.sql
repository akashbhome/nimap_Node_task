
CREATE TABLE `category` (
  `cid` int NOT NULL AUTO_INCREMENT,
  `catename` varchar(100) NOT NULL,
  PRIMARY KEY (`cid`),
  UNIQUE KEY `catename` (`catename`)
)

CREATE TABLE `product` (
  `pid` int NOT NULL AUTO_INCREMENT,
  `pname` varchar(100) DEFAULT NULL,
  `cid` int DEFAULT NULL,
  PRIMARY KEY (`pid`),
  KEY `cid` (`cid`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`cid`) REFERENCES `category` (`cid`) ON DELETE SET NULL ON UPDATE CASCADE
) 