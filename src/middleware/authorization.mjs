import { db } from "../models/db.mjs";
import { authenticateUserSQL } from "../models/usersModels.mjs";

function decodeAuthBasic (headerContent) {
    try {
        const [ method, token ] = headerContent.split(" ");
        const tokenString = atob(token);
        const [ username, password ] = tokenString.split(":");
        return { method, username, password }
    } catch (error) {
        throw "Malformed authentication";
    }
}

export function authMiddleware( request, response, next ) {
    try {
        const { method, username, password } = decodeAuthBasic(request.headers.authorization);

        if ( method != "Basic" ) throw "Invalid authorization method. Use Basic instead."
    
        db.get(
            authenticateUserSQL, [username, password],
            (err, data) => {
                if (err) throw err
                if (data) {
                    response.locals.authorization = { name: data.name, id: data.id };
                    next();
                }
                else throw "Bad authentication"
            }
        )

    } catch (err) {
        console.error(err);
        response.sendStatus(401)
        return;
    }
}