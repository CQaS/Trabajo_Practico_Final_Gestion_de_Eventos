import Invalid_tokens from '../models/invalid_tokens.models.js'

/* 
Función para verificar y eliminar tokens inválidos antiguos:
- Se define una constante maxTokens con un valor de 500, que representa el límite máximo de tokens inválidos permitidos en la base de datos.

1. Contar los tokens inválidos:
   - Utiliza Invalid_tokens.count() para contar la cantidad total de tokens almacenados en la tabla Invalid_tokens.
   - Imprime en la consola la cantidad de tokens antiguos encontrados.

2. Verificar si se excede el límite de tokens:
   - Si la cantidad de tokens (count) es mayor que maxTokens, se calcula cuántos tokens deben eliminarse (tokensAEliminar) restando maxTokens de count.

3. Buscar tokens antiguos a eliminar:
   - Utiliza Invalid_tokens.findAll() para buscar los tokens que son más antiguos que 7 días (168 horas).
   - Se establece un criterio en la cláusula where para filtrar los tokens cuya fecha de invalidez (invalido_en) es menor que la fecha actual menos 7 días.
   - Los resultados se ordenan por fecha de invalidez en orden ascendente y se limita el número de resultados a tokensAEliminar.

4. Eliminar los tokens antiguos:
   - Se itera sobre cada token antiguo encontrado y se llama a token.destroy() para eliminarlo de la base de datos.
   - Imprime en la consola cuántos tokens antiguos han sido eliminados.

Esta función está diseñada para gestionar el almacenamiento de tokens inválidos, asegurando que no se exceda un límite predefinido y eliminando automáticamente los registros más antiguos para mantener la base de datos limpia y eficiente.
*/

export const CheckLimitInvalidTokens = async () => {
    const maxTokens = 500

    const count = await Invalid_tokens.count()
    console.log(`${count} tokens antiguos`)

    if (count > maxTokens) {
        const tokensAEliminar = count - maxTokens

        const oldTokens = await Invalid_tokens.findAll({
            where: {
                invalido_en: {
                    [Op.lt]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
                }
            },
            order: [
                ['invalido_en', 'ASC']
            ],
            limit: tokensAEliminar,
        })

        for (let token of oldTokens) {
            await token.destroy()
        }

        console.log(`${tokensToDelete} tokens antiguos eliminados`)
    }
}