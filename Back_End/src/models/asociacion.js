import Usuarios from './usuario.models.js'
import Organizador from './organizador.models.js'
import Evento from './evento.models.js'
import RegistroAsistencia from './Registro_Asistencia.models.js'
import Certificados from './Certificado.models.js'


// Un Organizador tiene muchos Eventos
Organizador.hasMany(Evento, {
    foreignKey: 'organizador_id',
    as: 'eventos',
})

// Un Evento pertenece a un Organizador
Evento.belongsTo(Organizador, {
    foreignKey: 'organizador_id',
    as: 'organizador',
})

// Un Usuarios tiene muchos Registros de Asistencia
Usuarios.hasMany(RegistroAsistencia, {
    foreignKey: 'usuario_id',
    as: 'registrosAsistencia',
})

// Un Registro de Asistencia pertenece a un Usuario
RegistroAsistencia.belongsTo(Usuarios, {
    foreignKey: 'usuario_id',
    as: 'usuarios',
})

// Un Evento tiene muchos Registros de Asistencia
Evento.hasMany(RegistroAsistencia, {
    foreignKey: 'evento_id',
    as: 'registrosAsistencia',
})

// Un Registro de Asistencia pertenece a un Evento
RegistroAsistencia.belongsTo(Evento, {
    foreignKey: 'evento_id',
    as: 'evento',
})

// Un Registro de Asistencia puede tener un Certificado
RegistroAsistencia.hasOne(Certificados, {
    foreignKey: 'registro_id',
    as: 'certificado',
})

// Un Certificado pertenece a un Registro de Asistencia
Certificados.belongsTo(RegistroAsistencia, {
    foreignKey: 'registro_id',
    as: 'registroAsistencia',
})

export {
    Usuarios,
    Organizador,
    Evento,
    RegistroAsistencia,
    Certificados

}