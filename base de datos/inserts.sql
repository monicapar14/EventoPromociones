//inserts para servicios
insert into servicios (nombre, descripcion, precio) values ('Preparación de terreno' , 'Limpieza, arado y rastreo del suelo.', '1500');
insert into servicios (nombre, descripcion, precio) values ('Siembra mecanizada', 'Siembra con maquinaria agrícola.', '800');
insert into servicios (nombre, descripcion, precio) values ('Aplicación de fertilizante', 'Distribución de abono y nutrientes.', '500');
insert into servicios (nombre, descripcion, precio) values ('Fumigación agrícola', 'Control de plagas y enfermedades.', '450');
insert into servicios (nombre, descripcion, precio) values ('Instalación de riego', 'Sistema básico de riego agrícola.', '6000');
insert into servicios (nombre, descripcion, precio) values ('Mantenimiento de cultivos', 'Limpieza y cuidado general del cultivo.', '350');
insert into servicios (nombre, descripcion, precio) values ('Análisis de suelo', 'Evaluación de calidad y nutrientes del suelo.', '600');
insert into servicios (nombre, descripcion, precio) values ('Cosecha manual', 'Recolección manual de cultivos.', '900');
insert into servicios (nombre, descripcion, precio) values ('Cosecha mecanizada', 'Recolección con maquinaria.', '2000');
insert into servicios (nombre, descripcion, precio) values ('Transporte agrícola', 'Transporte de productos o insumos.', '1200');
insert into servicios (nombre, descripcion, precio) values ('Podas agrícolas', 'Poda de árboles frutales o café.', '1000');
insert into servicios (nombre, descripcion, precio) values ('Instalación de invernadero', 'Construcción básica de invernadero.', '25000');
insert into servicios (nombre, descripcion, precio) values ('Asesoría técnica agrícola', 'Recomendaciones y supervisión agrícola.', '750');
insert into servicios (nombre, descripcion, precio) values ('Sistemas de drenaje', 'Instalación de drenajes agrícolas.', '4500'); 
insert into servicios (nombre, descripcion, precio) values ('Producción de almácigos', 'Preparación de plántulas para siembra.', '2');


//inserts para productos
insert into productos (nombre, descripcion, precio) values ('Fertilizante NPK', 'Abono completo para crecimiento y producción.', '280');
insert into productos (nombre, descripcion, precio) values ('Urea agrícola', 'Fertilizante nitrogenado de alta concentración.', '260');
insert into productos (nombre, descripcion, precio) values ('Herbicida total', 'Control de maleza en cultivos agrícolas.', '180');
insert into productos (nombre, descripcion, precio) values ('Fungicida sistémico', 'Protección contra hongos y enfermedades.', '220');
insert into productos (nombre, descripcion, precio) values ('Insecticida agrícola', 'Eliminación y control de insectos dañinos.', '195');
insert into productos (nombre, descripcion, precio) values ('Semilla de maíz híbrido', 'Semilla de alto rendimiento.', '450');
insert into productos (nombre, descripcion, precio) values ('Semilla de frijol', 'Semilla seleccionada para siembra.', '180');
insert into productos (nombre, descripcion, precio) values ('Manguera para riego', 'Manguera resistente para sistemas agrícolas.', '350');
insert into productos (nombre, descripcion, precio) values ('Bomba fumigadora', 'Equipo manual para fumigación.', '650');
insert into productos (nombre, descripcion, precio) values ('Azadón agrícola', 'Herramienta para limpieza y cultivo.', '120');
insert into productos (nombre, descripcion, precio) values ('Pala cuadrada', 'Pala resistente para trabajo agrícola.', '140');
insert into productos (nombre, descripcion, precio) values ('Machete agrícola', 'Herramienta para corte y limpieza.', '95');
insert into productos (nombre, descripcion, precio) values ('Sistema de riego por goteo', 'Kit básico de riego eficiente.', '2500');
insert into productos (nombre, descripcion, precio) values ('Abono orgánico', 'Fertilizante natural para cultivos.', '150');
insert into productos (nombre, descripcion, precio) values ('Bandeja para almácigos', 'Bandeja reutilizable para plántulas.', '35');
insert into productos (nombre, descripcion, precio) values ('Tierra preparada', 'Sustrato fértil para siembra y viveros.', '80');
insert into productos (nombre, descripcion, precio) values ('Guantes agrícolas', 'Protección para trabajos de campo.', '45');
insert into productos (nombre, descripcion, precio) values ('Botas de hule', 'Calzado resistente para agricultura.', '175');
insert into productos (nombre, descripcion, precio) values ('Tanque para agua', 'Depósito plástico para almacenamiento.', '1800');
insert into productos (nombre, descripcion, precio) values ('Motobomba de agua', 'Equipo para extracción y riego.', '3200');

//consulta 
INSERT INTO `evento_promociones`.`consultas` (`id_consulta`, `nombre_consulta`) VALUES ('1', 'Servicio');
INSERT INTO `evento_promociones`.`consultas` (`id_consulta`, `nombre_consulta`) VALUES ('2', 'Producto');

//descuentos en los servicios y productos
INSERT INTO `evento_promociones`.`desc_consultas` (`id`, `id_consulta`, `campoC`, `descuento`) VALUES ('1', '1', '2',  '0.03');
INSERT INTO `evento_promociones`.`desc_consultas` (`id`, `id_consulta`, `campoC`, `campoP`, `descuento`) VALUES ('2', '1', '2', '1500', '0.05');
INSERT INTO `evento_promociones`.`desc_consultas` (`id`, `id_consulta`, `campoC`, `descuento`) VALUES ('3', '2', '3', '0.03');
INSERT INTO `evento_promociones`.`desc_consultas` (`id`, `id_consulta`, `campoC`, `descuento`) VALUES ('4', '2', '5', '0.05');

//cupo del evento
insert into evento_cupo (nombre_evento, cupo_maximo) values ('Evento de Promociones', 45);

//confirmaciones
INSERT INTO `evento_promociones`.`confirmacion` (`id_confirmacion`, `nombres`, `apellidos`, `email`,`fecha_confirmacion`, `descuento_servicio`)VALUES('1', 'Mónica', 'Par', 'monicapar14@gmail.com','2026-05-21', 0.03);

//producto seleccionado 
INSERT INTO `evento_promociones`.`productos_seleccionados` (`id_seleccionado`, `id_confirmacion`, `id_producto`) VALUES ('1', '1', '2');

//servicio seleccionado
INSERT INTO `evento_promociones`.`servicios_seleccionados` (`id_seleccionado`, `id_confirmacion`, `id_servicio`) VALUES ('1', '1', '2');
