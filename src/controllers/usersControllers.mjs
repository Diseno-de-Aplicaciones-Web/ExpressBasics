import { db } from "../models/db.mjs";
import { requestError } from "./auxiliar.mjs"

export function postUserController (request, response) {
    users.push(request.body);
    response.sendStatus(201)
}