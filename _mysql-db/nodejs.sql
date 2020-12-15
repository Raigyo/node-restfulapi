-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mar. 15 déc. 2020 à 17:06
-- Version du serveur :  8.0.22-0ubuntu0.20.04.3
-- Version de PHP : 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `nodejs`
--

-- --------------------------------------------------------

--
-- Structure de la table `members`
--

CREATE TABLE `members` (
  `id` varchar(36) COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Déchargement des données de la table `members`
--

INSERT INTO `members` (`id`, `name`) VALUES
('0792f500-3ee0-11eb-9017-af51aab4e642', 'Ling'),
('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'Louise'),
('74f01040-3ed8-11eb-9017-af51aab4e642', 'Elon'),
('8074ff60-3e02-11eb-9f66-85c018c14a22', 'Johnny'),
('bc21e740-3e01-11eb-b14d-350440681f8e', 'Raigyo'),
('e11184f0-3ed5-11eb-9017-af51aab4e642', 'Paul'),
('e7e039c0-3ed5-11eb-9017-af51aab4e642', 'Leny'),
('f253dab0-3ed5-11eb-9017-af51aab4e642', 'Michael'),
('f755bec0-3ed5-11eb-9017-af51aab4e642', 'Jules');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
