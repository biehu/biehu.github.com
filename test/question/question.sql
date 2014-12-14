-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2014 年 12 月 14 日 12:46
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
-- 表的结构 `ask`
--

CREATE TABLE IF NOT EXISTS `ask` (
  `ask_id` int(11) NOT NULL AUTO_INCREMENT,
  `ask_answer` varchar(20) NOT NULL,
  `ask_time` varchar(255) NOT NULL,
  PRIMARY KEY (`ask_id`),
  KEY `ask_id` (`ask_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=gbk AUTO_INCREMENT=41 ;

--
-- 转存表中的数据 `ask`
--

INSERT INTO `ask` (`ask_id`, `ask_answer`, `ask_time`) VALUES
(1, 'asddddss', '1418555331'),
(2, 'asddddss4', '1418555788'),
(15, 'asddd0dss', '1418556741'),
(17, 'asddd0dss', '1418556845'),
(18, 'asddd0dss', '1418556846'),
(19, 'asddd0dss', '1418557043'),
(20, 'asddd0dss', '1418557043'),
(21, 'asddd0dss', '1418557043'),
(22, 'asddd0dss', '1418557043'),
(23, 'asddd0dss', '1418557044'),
(24, 'asddd0dss', '1418557044'),
(25, 'asddd0dss', '1418557053'),
(26, 'asddd0dss', '1418557053'),
(27, 'asddd0dss', '1418557053'),
(28, 'asddd0dss', '1418557053'),
(29, 'asddd0dss', '1418557095'),
(30, 'asddd0dss', '1418557095'),
(31, 'asddd0dss', '1418557095'),
(32, 'asddd0dss', '1418557215'),
(33, 'asddd0dss', '1418557215'),
(34, 'asddd0dss', '1418557650'),
(35, 'asddd0dss', '1418559168'),
(36, 'asddd0dss', '1418559170'),
(37, 'asddd0dss', '1418559171'),
(38, 'asddd0dss', '1418559185'),
(39, 'asddd0dss', '1418559866'),
(40, 'asddd0dss', '1418560918');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
