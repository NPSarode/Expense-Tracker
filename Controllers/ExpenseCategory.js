import { db } from '../DB/DbConnection.js'

export const getExpenseCategories = async (request, response) => {
    try {
        const { rows } = await db.query("SELECT * FROM categories")
        response.status(200).send({data: rows})
    } catch (error) {
        console.log({error})
        response.status(422).send({
            message: "Something went wrong ! Try Again.",
            innerException: error
        })
    }
}