import Usuarios from './usuario.models.js'
/* import Organizador from './Organizadores.models.js'
import Eventos from './Eventos.models.js'
import RegistroAsistencias from './Registro_Asistencia.models.js'
import Certificados from './Certificados.models.js' */


/* // Un Organizador tiene muchos Eventos
Organizador.hasMany(Eventos, {
    foreignKey: 'organizador_id',
    as: 'eventos',
})

// Un Evento pertenece a un Organizador
Eventos.belongsTo(Organizador, {
    foreignKey: 'organizador_id',
    as: 'organizador',
})

// Un Usuarios tiene muchos Registros de Asistencia
Usuarios.hasMany(RegistroAsistencias, {
    foreignKey: 'usuarios_id',
    as: 'registrosAsistencia',
})

// Un Registro de Asistencia pertenece a un Usuario
RegistroAsistencias.belongsTo(Usuarios, {
    foreignKey: 'usuario_id',
    as: 'usuarios',
})

// Un Evento tiene muchos Registros de Asistencia
Eventos.hasMany(RegistroAsistencias, {
    foreignKey: 'evento_id',
    as: 'registrosAsistencia',
})

// Un Registro de Asistencia pertenece a un Evento
RegistroAsistencias.belongsTo(Eventos, {
    foreignKey: 'evento_id',
    as: 'evento',
})

// Un Registro de Asistencia puede tener un Certificado
RegistroAsistencias.hasOne(Certificados, {
    foreignKey: 'registro_id',
    as: 'certificado',
})

// Un Certificado pertenece a un Registro de Asistencia
Certificados.belongsTo(RegistroAsistencias, {
    foreignKey: 'registro_id',
    as: 'registroAsistencia',
}) */

// Exportar el sequelize y las relaciones
export {
    Usuarios,
    /* Organizador,
    Eventos,
    RegistroAsistencias,
    Certificados */

}