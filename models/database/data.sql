-- Database: monet

--DROP DATABASE IF EXISTS monet;

-- CREATE DATABASE monet
--     WITH
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'es_CL.UTF-8'
--     LC_CTYPE = 'es_CL.UTF-8'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1;


CREATE TABLE IF NOT EXISTS existencias
(
    id serial NOT NULL,
    fecha_creacion timestamp without time zone,
    id_producto integer NOT NULL,
    total_producto integer NOT NULL,
    id_ubicacion integer NOT NULL,
    id_usuario integer NOT NULL,
    CONSTRAINT idx_existencias PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS productos
(
    id serial NOT NULL,
    nombre character varying(200) COLLATE pg_catalog."default" NOT NULL,
    activo boolean NOT NULL DEFAULT true,
    id_tipo_producto integer NOT NULL,
    fecha_creacion timestamp without time zone,
    id_marca integer NOT NULL,
    descripcion character varying(200)[],
    CONSTRAINT idx_productos PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS reservas
(
    id serial NOT NULL,
    id_producto integer,
    id_ubicacion integer,
    cantidad bigint,
    activo boolean,
    es_minima boolean,
    es_maxima boolean,
    CONSTRAINT idx_reservas PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS tipo_producto
(
    id serial NOT NULL,
    es_importacion boolean NOT NULL DEFAULT false,
    nombre character varying(200) COLLATE pg_catalog."default" NOT NULL,
    fecha_creacion timestamp without time zone,
    CONSTRAINT idx_tipo_producto PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS transferencias
(
    id serial NOT NULL,
    id_ubicacion_origen integer NOT NULL,
    id_ubicacion_destino integer NOT NULL,
    id_usuario integer NOT NULL,
    id_producto integer NOT NULL,
    cantidad bigint,
    fecha_creacion timestamp without time zone,
    CONSTRAINT idx_transferencia PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS ubicaciones
(
    id serial NOT NULL,
    nombre character varying(200) COLLATE pg_catalog."default",
    activo boolean NOT NULL DEFAULT true,
    descripcion character varying(200) COLLATE pg_catalog."default",
    fecha_creacion timestamp without time zone,
    es_para_venta boolean DEFAULT false,
    CONSTRAINT idx_ubicaciones PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS usuarios
(
    id serial NOT NULL,
    nombre character varying(200) COLLATE pg_catalog."default",
    activo boolean DEFAULT true,
    fecha_creacion timestamp without time zone,
    validacion character varying(200)[] COLLATE pg_catalog."default",
    email character varying(100)[] NOT NULL,
    password character varying(200)[] NOT NULL,
    CONSTRAINT idx_usuarios PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS marcas
(
    id serial,
    nombre character varying(200)[] NOT NULL,
    activo boolean NOT NULL DEFAULT true,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS existencias
    ADD CONSTRAINT fk_producto FOREIGN KEY (id_producto)
    REFERENCES productos (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS existencias
    ADD CONSTRAINT fk_ubicaciones FOREIGN KEY (id_ubicacion)
    REFERENCES ubicaciones (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS existencias
    ADD CONSTRAINT fk_usuario FOREIGN KEY (id_usuario)
    REFERENCES usuarios (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS productos
    ADD CONSTRAINT fk_producto_tipo_producto FOREIGN KEY (id_tipo_producto)
    REFERENCES tipo_producto (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS productos
    ADD CONSTRAINT "fk_producto-marca" FOREIGN KEY (id_marca)
    REFERENCES marcas (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS reservas
    ADD CONSTRAINT fk_productos FOREIGN KEY (id_producto)
    REFERENCES productos (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS reservas
    ADD CONSTRAINT fk_ubicacion FOREIGN KEY (id_ubicacion)
    REFERENCES ubicaciones (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS transferencias
    ADD CONSTRAINT fk_ubicacion_destino FOREIGN KEY (id_ubicacion_destino)
    REFERENCES ubicaciones (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS transferencias
    ADD CONSTRAINT fk_ubicacion_origen FOREIGN KEY (id_ubicacion_origen)
    REFERENCES ubicaciones (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS transferencias
    ADD CONSTRAINT fk_usuario FOREIGN KEY (id_usuario)
    REFERENCES usuarios (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS transferencias
    ADD CONSTRAINT id_producto FOREIGN KEY (id_producto)
    REFERENCES productos (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

