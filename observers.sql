-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 08, 2015 at 12:27 PM
-- Server version: 5.5.41-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `observers`
--

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

CREATE TABLE IF NOT EXISTS `log` (
  `idlog` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_iduser` int(11) NOT NULL,
  `type` enum('add','edit','delete','') NOT NULL,
  `table` varchar(150) NOT NULL,
  `desc` text,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `table_idtable` bigint(20) NOT NULL,
  `value` varchar(100) NOT NULL,
  PRIMARY KEY (`idlog`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=302 ;

-- --------------------------------------------------------

--
-- Table structure for table `observers`
--

CREATE TABLE IF NOT EXISTS `observers` (
  `id_ob` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `nationality` int(11) DEFAULT NULL,
  `pass_nid` varchar(300) NOT NULL,
  `registration_org` varchar(300) NOT NULL,
  `gendr` tinyint(2) NOT NULL,
  `email` varchar(300) NOT NULL,
  `phone` varchar(300) NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modify_date` datetime DEFAULT NULL,
  `status` tinyint(2) NOT NULL DEFAULT '1',
  `upload` tinyint(2) NOT NULL DEFAULT '0',
  `upload_date` datetime DEFAULT NULL,
  `director` tinyint(2) NOT NULL DEFAULT '0',
  `print` tinyint(2) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_ob`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `organisaition`
--

CREATE TABLE IF NOT EXISTS `organisaition` (
  `id_org` int(11) NOT NULL AUTO_INCREMENT,
  `registration_no` varchar(300) NOT NULL,
  `name_org` varchar(300) NOT NULL,
  `name_director` varchar(300) NOT NULL,
  `type` int(2) NOT NULL,
  `phone` varchar(300) NOT NULL,
  `email` varchar(300) NOT NULL,
  `address` int(11) DEFAULT NULL,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modify_date` datetime DEFAULT NULL,
  `status` tinyint(2) NOT NULL DEFAULT '1',
  `upload` tinyint(2) NOT NULL DEFAULT '0',
  `upload_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id_org`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL,
  `password` varchar(500) NOT NULL,
  `salt` varchar(500) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `phone_no` varchar(100) NOT NULL,
  `id_office` int(11) NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
