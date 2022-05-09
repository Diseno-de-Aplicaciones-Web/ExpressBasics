import { db } from "../models/db.mjs"

import { requestError } from "./auxiliar.mjs";
import { getTasksSQL, addTaskSQL, getOneTaskByIdSQL, updateTaskSQL, deleteTaskSQL } from "../models/tasksModels.mjs"

export function getAllTasksController (request, response) {
    try {
        db.all(
            getTasksSQL, response.locals.authorization.id,
            (err,data)=>{
                if ( err ) throw err
                else response.json(data)
            }
        )
    } catch (err) {
        requestError(err, response)
    }

}

export function getOneTaskController (request, response) {
    try {
        db.get(
            getOneTaskByIdSQL,
            [request.params.id, response.locals.authorization.id],
            (err, data) => {
                if ( err ) throw err
                else if ( data ) response.json(data)
                else response.sendStatus(404)
            }
        )
    } catch (err) {
        requestError(err, response)
    }
}

export function postTaskController (request, response) {
    try {
        db.run(
            addTaskSQL,
            [
                request.body.description,
                request.body.done,
                response.locals.authorization.id
            ],
            (err)=>{
                if (err) throw err
                else response.sendStatus(201)
            }
        )
    } catch (err) {
        requestError(err, response)
    }

}

export function putTaskController (request, response) {
    try {
        db.get(getOneTaskByIdSQL,
            [request.body.id, response.locals.authorization.id],
            (err, data)=>{
                if (err) throw err;
                else if (data) db.run(
                    updateTaskSQL,
                    [
                        request.body.description,
                        request.body.done,
                        request.body.id,
                        response.locals.authorization.id
                    ],
                    (err)=>{
                        if (err) throw err
                        else {
                            response.sendStatus(200)
                        }
                    }
                )
                else response.sendStatus(404);
            }
        )
    } catch (err) {
        requestError(err, response)
    }
}

export function deleteTaskController (request, response) {
    try {
        db.run(deleteTaskSQL,
            [
                request.body.id,
                response.locals.authorization.id
            ],
            (err)=>{
                if (err) throw err
                else response.sendStatus(200);
            })
    } catch (err) {
        requestError(err, response)
    }
}