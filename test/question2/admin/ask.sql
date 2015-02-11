-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2014 年 12 月 17 日 05:58
-- 服务器版本: 5.5.24-log
-- PHP 版本: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `question`
--

-- --------------------------------------------------------

--
-- 表的结构 `ask2`
--

CREATE TABLE IF NOT EXISTS `ask2` (
  `ask_id` int(11) NOT NULL AUTO_INCREMENT,
  `ask_answer` varchar(20) NOT NULL,
  `ask_result` varchar(11) NOT NULL,
  `ask_time` varchar(255) NOT NULL,
  PRIMARY KEY (`ask_id`),
  KEY `ask_id` (`ask_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=gbk AUTO_INCREMENT=52 ;

--
-- 转存表中的数据 `ask2`
--

INSERT INTO `ask2` (`ask_id`, `ask_answer`, `ask_result`, `ask_time`) VALUES
(44, 'ABCACB', '2', '1418786047'),
(45, 'ABCACB', '2', '1418786074'),
(46, 'ABCACB', '2', '1418791955'),
(47, 'ABCACB', '2', '1418791956'),
(48, 'ABCABC', '3', '1418795499'),
(49, 'BCABCA', '3', '1418795542'),
(50, 'AAAAAA', '1', '1418795734'),
(51, 'AAABCA', '2', '1418795806');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
