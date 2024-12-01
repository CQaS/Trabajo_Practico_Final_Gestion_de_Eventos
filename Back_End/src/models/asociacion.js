import Usuarios from './usuario.models.js'
import Organizador from './organizador.models.js'
import Evento from './evento.models.js'
import RegistroAsistencia from './Registro_Asistencia.models.js'
import Certificados from './Certificado.models.js'


/* 
Definición de relaciones entre modelos en una base de datos utilizando Sequelize:

1. Un Organizador tiene muchos Eventos:
   - Se establece una relación uno a muchos entre Organizador y Evento.
   - La clave foránea en la tabla Evento es 'organizador_id'.
   - Se define un alias 'eventos' para acceder a los eventos relacionados desde un organizador.

2. Un Evento pertenece a un Organizador:
   - Se establece una relación inversa donde un Evento está asociado a un Organizador.
   - La clave foránea en la tabla Evento es 'organizador_id'.
   - Se define un alias 'organizador' para acceder al organizador relacionado desde un evento.

3. Un Usuario tiene muchos Registros de Asistencia:
   - Se establece una relación uno a muchos entre Usuarios y RegistroAsistencia.
   - La clave foránea en la tabla RegistroAsistencia es 'usuario_id'.
   - Se define un alias 'registrosAsistencia' para acceder a los registros de asistencia relacionados desde un usuario.

4. Un Registro de Asistencia pertenece a un Usuario:
   - Se establece una relación inversa donde un Registro de Asistencia está asociado a un Usuario.
   - La clave foránea en la tabla RegistroAsistencia es 'usuario_id'.
   - Se define un alias 'usuarios' para acceder al usuario relacionado desde un registro de asistencia.

5. Un Evento tiene muchos Registros de Asistencia:
   - Se establece una relación uno a muchos entre Evento y RegistroAsistencia.
   - La clave foránea en la tabla RegistroAsistencia es 'evento_id'.
   - Se define un alias 'registrosAsistencia' para acceder a los registros de asistencia relacionados desde un evento.

6. Un Registro de Asistencia pertenece a un Evento:
   - Se establece una relación inversa donde un Registro de Asistencia está asociado a un Evento.
   - La clave foránea en la tabla RegistroAsistencia es 'evento_id'.
   - Se define un alias 'evento' para acceder al evento relacionado desde un registro de asistencia.

7. Un Registro de Asistencia puede tener un Certificado:
   - Se establece una relación uno a uno entre RegistroAsistencia y Certificados.
   - La clave foránea en la tabla Certificados es 'registro_id'.
   - Se define un alias 'certificado' para acceder al certificado relacionado desde un registro de asistencia.

8. Un Certificado pertenece a un Registro de Asistencia:
   - Se establece una relación inversa donde un Certificado está asociado a un Registro de Asistencia.
   - La clave foránea en la tabla Certificados es 'registro_id'.
   - Se define un alias 'registroAsistencia' para acceder al registro de asistencia relacionado desde un certificado.

Estas definiciones permiten establecer las relaciones necesarias entre los modelos, facilitando las consultas y operaciones sobre los datos relacionados en la base de datos.
*/


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