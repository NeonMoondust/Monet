INSERT INTO marcas(nombre, activo)VALUES( 'generico', true);
INSERT INTO marcas(nombre, activo)VALUES( 'patito', true);
INSERT INTO marcas(nombre, activo)VALUES( 'generico', true);

INSERT INTO tipo_producto(es_importacion, nombre, fecha_creacion)VALUES(false, 'repuesto de prueba', now());
INSERT INTO tipo_producto(es_importacion, nombre, fecha_creacion)VALUES(true, 'repuesto chile', now());
INSERT INTO tipo_producto(es_importacion, nombre, fecha_creacion)VALUES(true, 'marco', now());
INSERT INTO tipo_producto(es_importacion, nombre, fecha_creacion)VALUES(true, 'lente optico', now());

INSERT INTO usuarios (nombre, activo, fecha_creacion, validacion, email, password, rol)
VALUES('admin', true, now(), 'xyz', 'admin@admin.com', 'admin', '0');

-- INSERT INTO productos(nombre, activo, id_tipo_producto, fecha_creacion, id_marca, descripcion)VALUES
-- ( 'producto de prueba 1', true, 1, now(), 1, 'prueba de carga por script');