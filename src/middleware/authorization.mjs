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

export function authenticateUser (username, password) {
    try {
        db.get(
            authenticateUserSQL, [username, password],
            (err, data) => {
                if (err) throw err
                else if (data) return true
                else return false
            }
        )
    } catch (error) {
        throw error
    }
}

export function authMiddleware( request, response, next ) {
    try {
        const { method, username, password } = decodeAuthBasic(request.headers.authorization);

        if ( method != "Basic" ) throw "Invalid authorization method. Use Basic instead."
    
        if ( authenticateUser(username, password) ) {
            response.locals.authorization = { username }
            next()
        }  else {
            throw "Authorization error"
        }
    } catch (err) {
        console.error(err);
        response.sendStatus(401)
        return;
    }
}