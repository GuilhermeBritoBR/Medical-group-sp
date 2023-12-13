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
-- Banco de dados: `db`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `tabela`
--

CREATE TABLE `tabela` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `cpf` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tabela`
--

INSERT INTO `tabela` (`id`, `nome`, `senha`, `email`, `type`, `cpf`) VALUES
(63, 'brito', '12345672', 'brito.running@brito.com', 'Leitor', '333.333.333-22'),
(64, 'brito', 'vasco123', 'brito.running@brito.com', 'Administrador', '444.444.444-02'),
(71, 'brito_runner', 'corridaderua', 'brito@running.com', 'Leitor', '111.111.111-11'),
(72, 'sd12131', '121122222', '122222222@ffsdfsfd', 'Leitor', '111.111.111-11'),
(74, 'ana', 'anabananana', 'anabanana@gmail.com', 'Leitor', '123.456.788-99'),
(75, 'ana', 'anabanana', 'ana@gmail.com', 'Leitor', '123.456.789-89'),
(76, 'marcio', '12345678', 'marcio@gmail.com', 'Leitor', '000.000.000-00'),
(77, 'pedro', '123456789', 'ph@mail', 'Leitor', '123.456.789-10'),
(78, 'pedro', '123456789', 'ph@mail', 'Leitor', '123.456.789-10'),
(79, 'doutor', 'doutor123', 'doutor@gmail.com', 'Doutor', '000.000.000-00'),
(80, 'admin', 'admin123', 'admin@gmail.com', 'Administrador', '000.000.000-00'),
(81, 'leitor', 'leitor123', 'leitor@gmail.com', 'Leitor', '000.000.000-00'),
(82, 'Wellington', '12345678', 'wellington.gts21@gmail.com', 'Leitor', '464.545.454-55'),
(83, 'teste2', '12345678', 'teste2@gmail.com', 'Leitor', '321.111.112-22');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `tabela`
--
ALTER TABLE `tabela`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tabela`
--
ALTER TABLE `tabela`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
