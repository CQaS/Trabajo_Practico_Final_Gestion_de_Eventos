-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-12-2024 a las 17:31:20
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
(20, 10, 'mgz2ypzm', '2024-11-28'),
(21, 10, 'sjh335eg', '2024-11-28'),
(22, 7, 's6mfj16y', '2024-11-29'),
(23, 10, '7kpo6phb', '2024-11-29'),
(24, 45, '5owqq3fl', '2024-11-29'),
(25, 1, 'occnkwuw', '2024-11-30'),
(26, 53, 'krtwlxm7', '2024-11-30'),
(27, 54, 'zprn0z4c', '2024-12-01'),
(28, 55, 'kgrys84u', '2024-12-01'),
(29, 56, 'phhga76g', '2024-12-01');

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
(1, 'C I T Y', '2024-10-01', 'Corrientes City', 'Tendencias', 1),
(2, 'Taller de Emprendimiento', '2024-11-05', 'Auditorio Municipal', 'Taller para emprendedores locales', 2),
(5, 'C C M', '2024-12-02', 'Villa Mercedes San Luis', 'Turs de san luis 2024', 2),
(12, 'Conferencia de Innovación', '2024-12-05', 'Madrid, España', 'Un evento sobre innovación tecnológica y emprendimiento.', 1),
(13, 'Taller de Programación', '2024-12-15', 'Barcelona, España', 'Aprende los fundamentos de JavaScript en un taller práctico.', 1),
(14, 'Festival de Música Indie', '2024-11-20', 'Valencia, España', 'Una jornada llena de música independiente con artistas emergentes.', 2),
(15, 'Expo de Arte Contemporáneo', '2024-11-30', 'Bilbao, España', 'Muestra de arte moderno con obras de artistas locales.', 7),
(16, 'Cumbre Tecnológica 2024', '2024-12-10', 'San Francisco, EE. UU.', 'Un encuentro para líderes de la industria tecnológica.', 3),
(17, 'Hackathon de IA', '2024-12-18', 'Online', 'Una competencia global para desarrollar soluciones innovadoras con IA.', 3),
(18, 'Seminario de Ciberseguridad', '2025-01-10', 'Londres, Reino Unido', 'Un seminario sobre los últimos avances en ciberseguridad.', 3),
(19, 'Foro Empresarial Global', '2024-12-20', 'Nueva York, EE. UU.', 'Reúne a los principales líderes de negocios para discutir tendencias globales.', 4),
(20, 'Feria de Negocios Internacionales', '2025-01-05', 'Tokio, Japón', 'Conecta empresas de todo el mundo en un solo lugar.', 4),
(21, 'Maratón Solidaria', '2024-12-02', 'Sevilla, España', 'Evento deportivo para recaudar fondos para causas sociales.', 8),
(22, 'Charla Motivacional', '2024-12-12', 'Granada, España', 'Conferencia inspiradora sobre superación personal.', 8),
(23, 'Lanzamiento de Producto', '2024-11-28', 'Berlín, Alemania', 'Presentación de un nuevo producto innovador para el mercado.', 6),
(24, 'Workshop de Diseño Gráfico', '2024-12-08', 'París, Francia', 'Taller práctico sobre las últimas tendencias en diseño gráfico.', 6),
(25, 'Expo de Diseños Creativos', '2025-01-15', 'Ámsterdam, Países Bajos', 'Una exhibición de diseños únicos y creativos.', 6),
(26, 'Meet con Bootcam', '2024-12-01', 'Juana koslay', 'Angular, node, mysql', 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `invalid_tokens`
--

CREATE TABLE `invalid_tokens` (
  `id` int(11) NOT NULL,
  `token` varchar(1024) NOT NULL,
  `invalido_en` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `invalid_tokens`
--

INSERT INTO `invalid_tokens` (`id`, `token`, `invalido_en`) VALUES
(2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VycyI6W3sidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiJDJhJDEwJHozWDhDLmozTml5SVBTcmtlbTFqN2VSUmtCZnBBZFg0dDRaV2VLMzFOdy9aYXdyc1RSdjNHIn0seyJ1c2VybmFtZSI6InVzZXIxIiwicGFzc3dvcmQiOiIkMmEkMTAkckNKMkdUSnNwR25KODR1UzJ6Um9oT2YybXRaWVN4WXFhVTlCdVhac3NLUjJ1RDdHTXAvMjYifSx7InVzZXJuYW1lIjoidXNlcjIiLCJwYXNzd29yZCI6IiQyYSQxMCRsdnl2Tnd3cGdCOEdIUEYzb0dwaHUublZ0OC5VU2hDbXVyVExtYWlBWld4NUh5ODU1a01TUyJ9XSwiaWF0IjoxNzMxODY3Njc3fQ.Oep8j_mjrbDYbwGwpIvai4SkW6ZolrgV09RMccWILMU', '2024-11-17 21:52:21'),
(3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VycyI6W3sidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiJDJhJDEwJHozWDhDLmozTml5SVBTcmtlbTFqN2VSUmtCZnBBZFg0dDRaV2VLMzFOdy9aYXdyc1RSdjNHIn0seyJ1c2VybmFtZSI6InVzZXIxIiwicGFzc3dvcmQiOiIkMmEkMTAkckNKMkdUSnNwR25KODR1UzJ6Um9oT2YybXRaWVN4WXFhVTlCdVhac3NLUjJ1RDdHTXAvMjYifSx7InVzZXJuYW1lIjoidXNlcjIiLCJwYXNzd29yZCI6IiQyYSQxMCRsdnl2Tnd3cGdCOEdIUEYzb0dwaHUublZ0OC5VU2hDbXVyVExtYWlBWld4NUh5ODU1a01TUyJ9XSwiaWF0IjoxNzMxODgwNTMzfQ.5UqJVbm4EWjHNWq5zYWgmRMRDdLRe9i8gmvXOLF7RMM', '2024-11-17 21:56:32'),
(5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VycyI6W3sidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiJDJhJDEwJHozWDhDLmozTml5SVBTcmtlbTFqN2VSUmtCZnBBZFg0dDRaV2VLMzFOdy9aYXdyc1RSdjNHIn0seyJ1c2VybmFtZSI6InVzZXIxIiwicGFzc3dvcmQiOiIkMmEkMTAkckNKMkdUSnNwR25KODR1UzJ6Um9oT2YybXRaWVN4WXFhVTlCdVhac3NLUjJ1RDdHTXAvMjYifSx7InVzZXJuYW1lIjoidXNlcjIiLCJwYXNzd29yZCI6IiQyYSQxMCRsdnl2Tnd3cGdCOEdIUEYzb0dwaHUublZ0OC5VU2hDbXVyVExtYWlBWld4NUh5ODU1a01TUyJ9XSwiaWF0IjoxNzMxOTQzNDA0fQ.W9Lsoi5bVeGtW4cjMyjuiaBHfkhaoQrxff_MnoDBQP4', '2024-11-18 15:24:12'),
(6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6IiQyYSQxMCR6M1g4Qy5qM05peUlQU3JrZW0xajdlUlJrQmZwQWRYNHQ0WldlSzMxTncvWmF3cnNUUnYzRyJ9LCJpYXQiOjE3MzIyMTQ4NTd9.n9_A5Ws1jyHBfth6vINy_Qhpgt_M7Ox5vZWrEMW2ML0', '2024-11-21 18:53:37');

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
(2, 'María González', 'maria.gonzalez@example.com', 'persona', 'Crecer Eventos', '00-UH678-C'),
(3, 'Juan Pérez', 'juan.perez@gmail.com', 'persona', NULL, NULL),
(4, 'María López', 'maria.lopez@hotmail.com', 'persona', NULL, NULL),
(5, 'Tech Solutions', 'contacto@techsolutions.com', 'empresa', 'Tech Solutions', 'TS12345678'),
(6, 'Globex Corporation', 'info@globex.com', 'empresa', 'Globex Corporation', 'GLOB98765432'),
(7, 'Ana Fernández', 'ana.fernandez@yahoo.com', 'persona', NULL, NULL),
(8, 'Innovative Designs', 'support@innodesigns.net', 'empresa', 'Innovative Designs', 'ID56789012');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_asistencia`
--

CREATE TABLE `registro_asistencia` (
  `id_registro` int(11) NOT NULL,
  `evento_id` int(11) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `fecha_registro` date NOT NULL DEFAULT current_timestamp(),
  `asistio` tinyint(1) DEFAULT 0,
  `fecha_confirmacion` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `registro_asistencia`
--

INSERT INTO `registro_asistencia` (`id_registro`, `evento_id`, `usuario_id`, `fecha_registro`, `asistio`, `fecha_confirmacion`) VALUES
(1, 5, 2, '2024-09-10', 0, '2024-11-30'),
(7, 5, 6, '2024-10-26', 1, '2024-11-29'),
(10, 5, 8, '2024-11-26', 1, '2024-11-29'),
(25, 1, 1, '2024-11-28', 0, NULL),
(26, 1, 2, '2024-11-28', 0, NULL),
(41, 2, 2, '2024-11-28', 0, NULL),
(42, 2, 8, '2024-11-28', 0, NULL),
(43, 12, 9, '2024-11-28', 0, NULL),
(44, 12, 14, '2024-11-28', 0, NULL),
(45, 15, 17, '2024-11-28', 1, '2024-11-29'),
(46, 15, 13, '2024-11-28', 0, NULL),
(47, 17, 17, '2024-11-28', 0, NULL),
(48, 17, 13, '2024-11-28', 0, NULL),
(49, 16, 9, '2024-11-28', 0, NULL),
(50, 16, 15, '2024-11-28', 0, NULL),
(51, 19, 16, '2024-11-28', 0, NULL),
(52, 19, 15, '2024-11-28', 0, NULL),
(53, 26, 8, '2024-11-30', 1, '2024-11-30'),
(54, 20, 19, '2024-12-01', 1, '2024-12-01'),
(55, 25, 20, '2024-12-01', 1, '2024-12-01'),
(56, 25, 21, '2024-12-01', 1, '2024-12-01');

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
(6, 'Juan Pérez', 'juan.perez@example.com', 2147483647, '2024-10-23', 'Cashe Falsa 123, Ciudad XYZ', 'M', '12345678'),
(8, 'del colle', 'fiamma@mail.com', 2147483647, '2024-11-26', 'Volcan 90', 'F', '3434344'),
(9, 'Carlos Gómez', 'carlos.gomez@example.com', 634567890, '2024-11-28', 'Calle Mayor 10, Madrid, España', 'M', '12345678A'),
(10, 'Laura Martínez', 'laura.martinez@example.com', 678123456, '2024-11-27', 'Avenida Principal 45, Valencia, España', 'F', '98765432B'),
(11, 'David López', 'david.lopez@example.com', 645987654, '2024-11-26', 'Calle de la Luna 7, Barcelona, España', 'M', '34567890C'),
(12, 'Elena Fernández', 'elena.fernandez@example.com', 612345678, '2024-11-25', 'Paseo del Prado 12, Sevilla, España', 'F', '45678901D'),
(13, 'Marcos Ruiz', 'marcos.ruiz@example.com', 698765432, '2024-11-24', 'Calle Sol 15, Granada, España', 'M', '56789012E'),
(14, 'Isabel Sánchez', 'isabel.sanchez@example.com', 656789012, '2024-11-23', 'Avenida de Andalucía 8, Málaga, España', 'F', '67890123F'),
(15, 'Javier Ortega', 'javier.ortega@example.com', 623456789, '2024-11-22', 'Plaza Mayor 4, Valladolid, España', 'M', '78901234G'),
(16, 'Sofía Romero', 'sofia.romero@example.com', 611234567, '2024-11-21', 'Calle Victoria 9, Zaragoza, España', 'F', '89012345H'),
(17, 'Alex Morales', 'alex.morales@example.com', 667890123, '2024-11-20', 'Avenida Libertad 2, Bilbao, España', 'Otro', '90123456I'),
(18, 'Clara Navarro', 'clara.navarro@example.com', 645123987, '2024-11-19', 'Calle Esperanza 6, Murcia, España', 'F', '01234567J'),
(19, 'Pamela Varas', 'varas@mail.com', 2147483647, '2024-12-01', 'Calle juanperez', 'F', '38902749'),
(20, 'Yanina Sarmiento', 'yani@mail.com', 2147483647, '2024-12-01', 'las garzas 45', 'F', '46789234'),
(21, 'lorena alvarez', 'lore@mail.com', 2147483647, '2024-12-01', 'Merlo 45', 'F', '37895026');

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
-- Indices de la tabla `invalid_tokens`
--
ALTER TABLE `invalid_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`);

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
  MODIFY `id_certificado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `eventos`
--
ALTER TABLE `eventos`
  MODIFY `id_evento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `invalid_tokens`
--
ALTER TABLE `invalid_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `organizadores`
--
ALTER TABLE `organizadores`
  MODIFY `id_organizador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `registro_asistencia`
--
ALTER TABLE `registro_asistencia`
  MODIFY `id_registro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

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
