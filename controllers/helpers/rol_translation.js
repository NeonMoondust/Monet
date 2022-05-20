let rol_enum = {
    '0' : 'Administrador',
    '1' : 'Jefe',
    '2' : 'Vendedor',
}

module.exports = function rol_translation(rol_id){
    return rol_enum[rol_id];
}