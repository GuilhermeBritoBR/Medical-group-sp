-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Tempo de geração: 13/12/2023 às 12:33
-- Versão do servidor: 10.6.12-MariaDB-0ubuntu0.22.04.1
-- Versão do PHP: 8.1.2-1ubuntu2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `Interno`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `Exames`
--

CREATE TABLE `Exames` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `data` varchar(255) NOT NULL,
  `horas` varchar(255) NOT NULL,
  `obs` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `Exames`
--

INSERT INTO `Exames` (`id`, `nome`, `type`, `data`, `horas`, `obs`) VALUES
(1, 'brito', 'sangue', '18:39', '2023-12-23', 'diabetico'),
(2, 'brito', 'sangue', '18:08', '2023-12-19', 'obs');

-- --------------------------------------------------------

--
-- Estrutura para tabela `Pacientes`
--

CREATE TABLE `Pacientes` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `idade` int(11) DEFAULT NULL,
  `especialidade` varchar(255) DEFAULT NULL,
  `motivo` text DEFAULT NULL,
  `dia` text NOT NULL,
  `hora` text DEFAULT NULL,
  `deficiencia` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `Pacientes`
--

INSERT INTO `Pacientes` (`id`, `nome`, `idade`, `especialidade`, `motivo`, `dia`, `hora`, `deficiencia`) VALUES
(27, 'brito', 17, 'Dentista', 'Dor', '2023-12-16', '16:07', 'Nenhuma'),
(28, 'aaaaa', 17, 'Odontologia', 'carie', '2023-12-05', '19:10', 'Mental'),
(29, 'ana', 17, 'Odontologia', 'artimia', '2023-12-06', '19:35', 'Mental'),
(30, 'Marcio', 33, 'Odontologia', 'dor de dente', '2023-12-21', '10:00', 'Nenhuma'),
(31, 'pedro', 17, 'Nutrição', 'emagrecer', '2023-12-10', '09:00', 'Nenhuma'),
(32, 'Wellington', 17, 'Nutrição', 'Dor pós parto', '2050-03-21', '21:20', 'Mental'),
(33, 'leitor', 17, 'Cardiologista', 'exame para VO2', '2023-12-14', '12:10', 'Nenhuma');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `Exames`
--
ALTER TABLE `Exames`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `Pacientes`
--
ALTER TABLE `Pacientes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `Exames`
--
ALTER TABLE `Exames`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `Pacientes`
--
ALTER TABLE `Pacientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
