import Invalid_tokens from '../models/invalid_tokens.models.js'

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