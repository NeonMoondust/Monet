CREATE  TABLE existencias ( 
	id                   serial  NOT NULL  ,
	fecha_creacion       timestamp ,
	id_producto          serial    ,
	total_producto       serial    ,
	id_ubicacion         serial    ,
	id_usuario           serial    ,
	CONSTRAINT idx_existencias PRIMARY KEY ( id )
 );

CREATE  TABLE productos ( 
	id                   serial  NOT NULL  ,
	nombre               varchar(200)  NOT NULL  ,
	activo               boolean DEFAULT true NOT NULL  ,
	id_tipo_producto     serial    ,
	fecha_creacion       timestamp DEFAULT systimestamp   ,
	CONSTRAINT idx_productos PRIMARY KEY ( id )
 );

CREATE  TABLE reservas ( 
	id                   serial  NOT NULL  ,
	id_producto          serial    ,
	id_ubicacion         serial    ,
	cantidad             bigint    ,
	activo               boolean    ,
	es_minima            boolean    ,
	es_maxima            boolean    ,
	CONSTRAINT idx_reservas PRIMARY KEY ( id )
 );

CREATE  TABLE tipo_producto ( 
	id                   serial  NOT NULL  ,
	es_importacion       boolean DEFAULT false NOT NULL  ,
	nombre               varchar(200)  NOT NULL  ,
	fecha_creacion       timestamp DEFAULT systimestamp   ,
	CONSTRAINT idx_tipo_producto PRIMARY KEY ( id )
 );

CREATE  TABLE transferencias ( 
	id                   serial  NOT NULL  ,
	id_ubicacion_origen  serial  NOT NULL  ,
	id_ubicacion_destino serial  NOT NULL  ,
	id_usuario           serial    ,
	id_producto          serial    ,
	cantidad             bigint    ,
	fecha_creacion       timestamp DEFAULT systimestamp   ,
	CONSTRAINT idx_transferencia PRIMARY KEY ( id )
 );

CREATE  TABLE ubicaciones ( 
	id                   serial  NOT NULL  ,
	nombre               varchar(200)    ,
	activo               boolean DEFAULT true NOT NULL  ,
	descripcion          varchar(200)    ,
	fecha_creacion       timestamp DEFAULT systimestamp   ,
	es_para_venta        boolean DEFAULT false   ,
	CONSTRAINT idx_ubicaciones PRIMARY KEY ( id )
 );

CREATE  TABLE usuarios ( 
	id                   serial  NOT NULL  ,
	nombre               varchar(200)    ,
	activo               boolean DEFAULT true   ,
	fecha_creacion       timestamp DEFAULT systimestamp   ,
	CONSTRAINT idx_usuarios PRIMARY KEY ( id )
 );
