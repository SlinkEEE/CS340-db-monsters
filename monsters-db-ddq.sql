-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: Aug 10, 2019 at 09:32 AM
-- Server version: 10.3.13-MariaDB-log
-- PHP Version: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_babayans`
--

-- --------------------------------------------------------

--
-- Table structure for table `habitats`
--

CREATE TABLE `habitats` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL DEFAULT 'unknown',
  `climate` varchar(25) NOT NULL DEFAULT 'unknown'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `habitats`
--

INSERT INTO `habitats` (`id`, `name`, `climate`) VALUES
(1, 'outer space', 'freezing'),
(2, 'swamp', 'steamy'),
(3, 'your closet', 'room temperature'),
(4, 'under the bed', 'room temperature'),
(5, 'a tower', 'various');

-- --------------------------------------------------------

--
-- Table structure for table `monsters`
--

CREATE TABLE `monsters` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `color` varchar(25) NOT NULL DEFAULT 'unknown',
  `type` int(11) DEFAULT NULL,
  `habitat` int(11) DEFAULT NULL,
  `scariness` int(11) NOT NULL
) ;

--
-- Dumping data for table `monsters`
--

INSERT INTO `monsters` (`id`, `name`, `color`, `type`, `habitat`, `scariness`) VALUES
(2, 'Frank', 'green', 1, 3, 1),
(3, 'Tentacula', 'white', 3, 2, 4),
(4, 'Dave', 'yellow', 4, 4, 3),
(5, 'Bam', 'black', 5, 5, 5),
(20, 'Bob', 'blue', 1, NULL, 1),
(23, 'Sheila', 'violet', 4, 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `monsters_skills`
--

CREATE TABLE `monsters_skills` (
  `monster_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `monsters_skills`
--

INSERT INTO `monsters_skills` (`monster_id`, `skill_id`) VALUES
(2, 4),
(3, 4),
(4, 4),
(5, 5),
(2, 4),
(3, 4),
(4, 4),
(5, 5),
(2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `monsters_weaknesses`
--

CREATE TABLE `monsters_weaknesses` (
  `monster_id` int(11) NOT NULL,
  `weakness_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `monsters_weaknesses`
--

INSERT INTO `monsters_weaknesses` (`monster_id`, `weakness_id`) VALUES
(2, 1),
(2, 3),
(2, 4);

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

CREATE TABLE `skills` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `difficulty` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `skills`
--

INSERT INTO `skills` (`id`, `name`, `difficulty`) VALUES
(1, 'stalking', 2),
(2, 'lurking', 2),
(3, 'flying', 5),
(4, 'rawr-ing', 1),
(5, 'climbing', 4),
(6, 'zooming', 2);

-- --------------------------------------------------------

--
-- Table structure for table `types`
--

CREATE TABLE `types` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `types`
--

INSERT INTO `types` (`id`, `name`) VALUES
(1, 'Martian'),
(2, 'Dragon'),
(3, 'Giant Spider'),
(4, 'Minion'),
(5, 'Irregular');

-- --------------------------------------------------------

--
-- Table structure for table `weaknesses`
--

CREATE TABLE `weaknesses` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `weaknesses`
--

INSERT INTO `weaknesses` (`id`, `name`) VALUES
(1, 'soapy water'),
(2, 'knights in shining armor'),
(3, 'garlic'),
(4, 'sunlight');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `habitats`
--
ALTER TABLE `habitats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `monsters`
--
ALTER TABLE `monsters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type` (`type`),
  ADD KEY `habitat` (`habitat`);

--
-- Indexes for table `monsters_skills`
--
ALTER TABLE `monsters_skills`
  ADD KEY `monster_id` (`monster_id`),
  ADD KEY `skill_id` (`skill_id`);

--
-- Indexes for table `monsters_weaknesses`
--
ALTER TABLE `monsters_weaknesses`
  ADD KEY `monster_id` (`monster_id`),
  ADD KEY `weakness_id` (`weakness_id`);

--
-- Indexes for table `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `weaknesses`
--
ALTER TABLE `weaknesses`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `habitats`
--
ALTER TABLE `habitats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `monsters`
--
ALTER TABLE `monsters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `types`
--
ALTER TABLE `types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `weaknesses`
--
ALTER TABLE `weaknesses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `monsters`
--
ALTER TABLE `monsters`
  ADD CONSTRAINT `monsters_ibfk_1` FOREIGN KEY (`type`) REFERENCES `types` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `monsters_ibfk_2` FOREIGN KEY (`habitat`) REFERENCES `habitats` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `monsters_skills`
--
ALTER TABLE `monsters_skills`
  ADD CONSTRAINT `monsters_skills_ibfk_1` FOREIGN KEY (`monster_id`) REFERENCES `monsters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `monsters_skills_ibfk_2` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `monsters_weaknesses`
--
ALTER TABLE `monsters_weaknesses`
  ADD CONSTRAINT `monsters_weaknesses_ibfk_1` FOREIGN KEY (`monster_id`) REFERENCES `monsters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `monsters_weaknesses_ibfk_2` FOREIGN KEY (`weakness_id`) REFERENCES `weaknesses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
