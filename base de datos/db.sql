CREATE DATABASE IF NOT EXISTS evento_promociones;
USE evento_promociones;

Create table Servicios(
    id_servicio INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255),
    precio DECIMAL(10, 2) NOT NULL
);

Create table Productos(
    id_producto INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255),
    precio DECIMAL(10, 2) NOT NULL
);

Create table Confirmacion(
    id_confirmacion INT PRIMARY KEY AUTO_INCREMENT,
    nombres VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    fecha_confirmacion DATETIME,
    descuento_servicio DECIMAL(10, 2),
    descuento_producto DECIMAL(10, 2)
);  

Create table Servicios_seleccionados(
    id_seleccionado INT PRIMARY KEY AUTO_INCREMENT,
    id_confirmacion INT,
    id_servicio INT,
    FOREIGN KEY (id_confirmacion) REFERENCES Confirmacion(id_confirmacion),
    FOREIGN KEY (id_servicio) REFERENCES Servicios(id_servicio)
);

Create table Productos_seleccionados(
    id_seleccionado INT PRIMARY KEY AUTO_INCREMENT,
    id_confirmacion INT,
    id_producto INT,
    FOREIGN KEY (id_confirmacion) REFERENCES Confirmacion(id_confirmacion),
    FOREIGN KEY (id_producto) REFERENCES Productos(id_producto)
); 

Create table Evento_Cupo(
    id_evento INT PRIMARY KEY AUTO_INCREMENT,
    nombre_evento VARCHAR(255) NOT NULL,
    cupo_maximo INT NOT NULL
);

create table consultas (
	id_consulta INT PRIMARY KEY AUTO_INCREMENT,
    nombre_consulta VARCHAR(50) not null
);

create table desc_Consultas(
	id INT PRIMARY KEY AUTO_INCREMENT,
    id_consulta INT,
    campoC INT, 
    campoP DECIMAL(10, 2),
    descuento DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_consulta) references consultas(id_consulta)
);


