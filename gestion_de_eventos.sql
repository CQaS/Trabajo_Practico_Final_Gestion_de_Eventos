-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-10-2024 a las 16:29:41
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestion_de_eventos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `certificados`
--

CREATE TABLE `certificados` (
  `id_certificado` int(11) NOT NULL,
  `registro_id` int(11) DEFAULT NULL,
  `url_certificado` varchar(255) NOT NULL,
  `fecha_emision` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `certificados`
--

INSERT INTO `certificados` (`id_certificado`, `registro_id`, `url_certificado`, `fecha_emision`) VALUES
(9, 7, '8oh1s64s', '2024-10-27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

CREATE TABLE `eventos` (
  `id_evento` int(11) NOT NULL,
  `nombre_evento` varchar(255) NOT NULL,
  `fecha_evento` date NOT NULL,
  `ubicacion_evento` varchar(255) NOT NULL,
  `descripcion_evento` text DEFAULT NULL,
  `organizador_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `eventos`
--

INSERT INTO `eventos` (`id_evento`, `nombre_evento`, `fecha_evento`, `ubicacion_evento`, `descripcion_evento`, `organizador_id`) VALUES
(1, 'C I T', '2024-10-01', 'CC', 'Tendencias', 1),
(2, 'Taller de Emprendimiento', '2024-11-05', 'Auditorio Municipal', 'Taller para emprendedores locales', 2),
(5, 'C C M', '2024-11-02', 'VdM', 'Turs', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `organizadores`
--

CREATE TABLE `organizadores` (
  `id_organizador` int(11) NOT NULL,
  `nombre_organizador` varchar(255) NOT NULL,
  `email_organizador` varchar(255) NOT NULL,
  `tipo_organizador` enum('persona','empresa') NOT NULL,
  `nombre_empresa` varchar(255) DEFAULT NULL,
  `nif_empresa` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `organizadores`
--

INSERT INTO `organizadores` (`id_organizador`, `nombre_organizador`, `email_organizador`, `tipo_organizador`, `nombre_empresa`, `nif_empresa`) VALUES
(1, 'Juan Pérez', 'juan.perez@example.com', 'persona', 'S/D', '34ER'),
(2, 'María González', 'maria.gonzalez@example.com', 'persona', 'Crecer Eventos', '00-UH678-C');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_asistencia`
--

CREATE TABLE `registro_asistencia` (
  `id_registro` int(11) NOT NULL,
  `evento_id` int(11) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `fecha_registro` date NOT NULL,
  `asistio` tinyint(1) DEFAULT 0,
  `fecha_confirmacion` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `registro_asistencia`
--

INSERT INTO `registro_asistencia` (`id_registro`, `evento_id`, `usuario_id`, `fecha_registro`, `asistio`, `fecha_confirmacion`) VALUES
(1, 5, 2, '2024-09-10', 0, NULL),
(7, 5, 6, '2024-10-26', 1, '2024-10-27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` varchar(255) NOT NULL,
  `email_usuario` varchar(255) NOT NULL,
  `telefono_usuario` int(15) NOT NULL,
  `fecha_registro` date DEFAULT curdate(),
  `direccion_usuario` varchar(255) NOT NULL,
  `sexo_usuario` enum('M','F','Otro') NOT NULL,
  `dni_usuario` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre_usuario`, `email_usuario`, `telefono_usuario`, `fecha_registro`, `direccion_usuario`, `sexo_usuario`, `dni_usuario`) VALUES
(1, 'Carlos Ramírez', 'carlos.ramirez@example.com', 56789, '2024-09-26', 'Moras 56', 'M', '63738'),
(2, 'Ana Torres', 'ana.torres@example.com', 3738, '2024-09-26', 'Algarrobo 34', 'F', '739038'),
(6, 'Juan Pérez', 'juan.perez@example.com', 2147483647, '2024-10-23', 'Cashe Falsa 123, Ciudad XYZ', 'M', '12345678');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `certificados`
--
ALTER TABLE `certificados`
  ADD PRIMARY KEY (`id_certificado`),
  ADD KEY `fk_registro_asistencia` (`registro_id`);

--
-- Indices de la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`id_evento`),
  ADD KEY `fk_organizador` (`organizador_id`);

--
-- Indices de la tabla `organizadores`
--
ALTER TABLE `organizadores`
  ADD PRIMARY KEY (`id_organizador`),
  ADD UNIQUE KEY `email_organizador` (`email_organizador`);

--
-- Indices de la tabla `registro_asistencia`
--
ALTER TABLE `registro_asistencia`
  ADD PRIMARY KEY (`id_registro`),
  ADD KEY `fk_evento` (`evento_id`),
  ADD KEY `fk_usuario` (`usuario_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email_usuario` (`email_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `certificados`
--
ALTER TABLE `certificados`
  MODIFY `id_certificado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `eventos`
--
ALTER TABLE `eventos`
  MODIFY `id_evento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `organizadores`
--
ALTER TABLE `organizadores`
  MODIFY `id_organizador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `registro_asistencia`
--
ALTER TABLE `registro_asistencia`
  MODIFY `id_registro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `certificados`
--
ALTER TABLE `certificados`
  ADD CONSTRAINT `fk_registro_asistencia` FOREIGN KEY (`registro_id`) REFERENCES `registro_asistencia` (`id_registro`);

--
-- Filtros para la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD CONSTRAINT `fk_organizador` FOREIGN KEY (`organizador_id`) REFERENCES `organizadores` (`id_organizador`);

--
-- Filtros para la tabla `registro_asistencia`
--
ALTER TABLE `registro_asistencia`
  ADD CONSTRAINT `fk_evento` FOREIGN KEY (`evento_id`) REFERENCES `eventos` (`id_evento`),
  ADD CONSTRAINT `fk_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
