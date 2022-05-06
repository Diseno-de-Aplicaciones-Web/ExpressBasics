import express from "express";

import { requestLog } from "./middleware/requestsLog.mjs";
import { authMiddleware } from "./middleware/authorization.mjs";
import { validateUserJSON } from "./middleware/jsonValidator.mjs";
import { validateNewTaskJSON, validateTaskJSON, validateDeleteTaskJSON } from "./middleware/jsonValidator.mjs";

import { postUserController } from "./controllers/usersControllers.mjs";
import { deleteTaskController, getOneTaskController, getAllTasksController, postTaskController, putTaskController } from "./controllers/tasksControllers.mjs";

const PATH_PREFIX = "/api/v0.0"
const app = express();
try {

    const jsonParser = express.json();

    app.use(requestLog);

    app.post(PATH_PREFIX+"/users/", jsonParser, validateUserJSON, postUserController);

    app.get(PATH_PREFIX+"/tasks/:id", authMiddleware, getOneTaskController);
    app.get(PATH_PREFIX+"/tasks/", authMiddleware, getAllTasksController);
    app.post(PATH_PREFIX+"/task/", authMiddleware, jsonParser, validateNewTaskJSON, postTaskController);
    app.put(PATH_PREFIX+"/task/", authMiddleware, jsonParser, validateTaskJSON, putTaskController);
    app.delete(PATH_PREFIX+"/task/", authMiddleware, jsonParser, validateDeleteTaskJSON, deleteTaskController);

    app.listen(process.env.PORT || 3000,()=>{
        console.log("Express running...");
    });
} catch (err) {
    console.error(err);
}