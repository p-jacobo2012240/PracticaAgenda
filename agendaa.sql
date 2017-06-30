-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-06-2017 a las 07:26:17
-- Versión del servidor: 10.1.21-MariaDB
-- Versión de PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `agendaa`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_addCategoria1` (IN `c_nombre` VARCHAR(30))  BEGIN
    INSERT INTO Categoria(nombreCategoria) VALUES (c_nombre);
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_addUser` (IN `user_name` VARCHAR(30), IN `passwordUser` VARCHAR(30))  BEGIN
	INSERT INTO Usuario(nick, contrasena) VALUES (user_name, passwordUser);
	END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_agregarContacto` (IN `ct_nombre` VARCHAR(30), IN `ct_apellido` VARCHAR(30), IN `ct_direccion` VARCHAR(30), IN `ct_telefono` VARCHAR(30), IN `ct_correo` VARCHAR(30), IN `ct_idCategoria` INT)  BEGIN
	INSERT INTO Contacto(nombreContacto, apellido, direccion, telefono, correo, idCategoria) VALUES (ct_nombre, ct_apellido, ct_direccion, ct_telefono, ct_correo, ct_idCategoria);
	END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_deleteCategoria` (IN `c_idCategoria` INT)  BEGIN 
		
    DELETE FROM Categoria
    WHERE  idCategoria= c_idCategoria;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_deleteContacto` (IN `ct_idContacto` INT)  BEGIN 
		
    DELETE FROM Contacto
    WHERE  idContacto = ct_idContacto;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_updateContacto` (IN `ct_idContacto` INT, IN `ct_nombre` VARCHAR(30), IN `ct_apellido` VARCHAR(30), IN `ct_direccion` VARCHAR(30), IN `ct_telefono` VARCHAR(30), IN `ct_correo` VARCHAR(30), IN `ct_idCategoria` INT)  BEGIN
    
    UPDATE Contacto
    SET
		nombre = ct_nombre, 
        apellido = ct_apellido,
        direccion = ct_direccion,
        telefono = ct_telefono,
        correo = ct_correo,
        idCategoria = ct_idCategoria
    WHERE idContacto =  ct_idContacto;
    END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idCategoria` int(11) NOT NULL,
  `nombreCategoria` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`idCategoria`, `nombreCategoria`) VALUES
(1, 'Familia'),
(2, 'Amigos'),
(3, 'trabajo'),
(6, 'Colegio');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacto`
--

CREATE TABLE `contacto` (
  `idContacto` int(11) NOT NULL,
  `nombreContacto` varchar(30) NOT NULL,
  `apellido` varchar(30) NOT NULL,
  `direccion` varchar(30) NOT NULL,
  `telefono` varchar(30) NOT NULL,
  `correo` varchar(30) NOT NULL,
  `idCategoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `contacto`
--

INSERT INTO `contacto` (`idContacto`, `nombreContacto`, `apellido`, `direccion`, `telefono`, `correo`, `idCategoria`) VALUES
(2, 'fernando', 'valdez', 'zona 11', '12567184', 'FeR@mail.com', 2),
(3, 'Sam', 'jacobo', 'zona 11', '2134762', 'sam@mail.com', 1),
(4, 'kevin', 'cabrera', 'zona 12', '24657690', 'Kevincab@mail.com', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `idHistorial` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `nick` varchar(30) NOT NULL,
  `contrasena` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `nick`, `contrasena`) VALUES
(1, 'pablo', '12345'),
(2, 'sam', '12345');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuariodetalle`
--

CREATE TABLE `usuariodetalle` (
  `idUsuarioDetalle` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idContacto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Disparadores `usuariodetalle`
--
DELIMITER $$
CREATE TRIGGER `registroContacto` AFTER INSERT ON `usuariodetalle` FOR EACH ROW BEGIN
    DECLARE _idUsuario integer;
    SET _idUsuario = (SELECT idUsuario from UsuarioDetalle ORDER BY idUsuarioDetalle DESC LIMIT 1);
    IF (_idUsuario <> 0) THEN
       INSERT INTO Historial(descripcion, idUsuario) VALUES ('Ha agregado un contacto', _idUsuario);
    END IF;
  END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vistacontacto`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vistacontacto` (
`idContacto` int(11)
,`nombreContacto` varchar(30)
,`apellido` varchar(30)
,`direccion` varchar(30)
,`telefono` varchar(30)
,`correo` varchar(30)
,`nombreCategoria` varchar(30)
);

-- --------------------------------------------------------

--
-- Estructura para la vista `vistacontacto`
--
DROP TABLE IF EXISTS `vistacontacto`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vistacontacto`  AS  select `contacto`.`idContacto` AS `idContacto`,`contacto`.`nombreContacto` AS `nombreContacto`,`contacto`.`apellido` AS `apellido`,`contacto`.`direccion` AS `direccion`,`contacto`.`telefono` AS `telefono`,`contacto`.`correo` AS `correo`,`categoria`.`nombreCategoria` AS `nombreCategoria` from (`contacto` join `categoria` on((`contacto`.`idCategoria` = `categoria`.`idCategoria`))) ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idCategoria`);

--
-- Indices de la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD PRIMARY KEY (`idContacto`),
  ADD KEY `idCategoria` (`idCategoria`);

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`idHistorial`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`);

--
-- Indices de la tabla `usuariodetalle`
--
ALTER TABLE `usuariodetalle`
  ADD PRIMARY KEY (`idUsuarioDetalle`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idContacto` (`idContacto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `contacto`
--
ALTER TABLE `contacto`
  MODIFY `idContacto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `idHistorial` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `usuariodetalle`
--
ALTER TABLE `usuariodetalle`
  MODIFY `idUsuarioDetalle` int(11) NOT NULL AUTO_INCREMENT;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD CONSTRAINT `contacto_ibfk_1` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`);

--
-- Filtros para la tabla `historial`
--
ALTER TABLE `historial`
  ADD CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`);

--
-- Filtros para la tabla `usuariodetalle`
--
ALTER TABLE `usuariodetalle`
  ADD CONSTRAINT `usuariodetalle_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`),
  ADD CONSTRAINT `usuariodetalle_ibfk_2` FOREIGN KEY (`idContacto`) REFERENCES `contacto` (`idContacto`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
