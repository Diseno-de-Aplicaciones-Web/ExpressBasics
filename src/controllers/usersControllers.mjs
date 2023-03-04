import { db } from "../models/db.mjs";

/**
 * Add a user in de database.
 * @param {*} request 
 * @param {*} response 
 */
export function postUserController (request, response) {
    const {name, password} = request.body;
    const sql = `
    INSERT INTO users ( name, password )
    values ( '${name}' , '${password}' )
    `;
    db.run(sql);
    response.sendStatus(201)
}

/**
 * Obtain all users.
 * @param {*} request 
 * @param {*} response 
 */
export function getAllUsersController(request, response){
    db.all("SELECT * FROM users",
    (err, data)=>{
        if (err){
            console.error(err);
            response.sendStatus(500);
        } else {
            response.json(data)
        }
    }
    )
}