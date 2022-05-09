import { db } from "../models/db.mjs";
import { requestError } from "./auxiliar.mjs"

import { addUserSQL } from "../models/usersModels.mjs";

export function postUserController (request, response) {
    try {
        db.run(
            addUserSQL, [request.body.name, request.body.password],
            (err) => {
                if (err) throw err
                else response.sendStatus(201)
            }
        )
    } catch (error) {
        requestError(error, response)
    }
}