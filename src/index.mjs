import express from "express";

import { authMiddleware } from "./middleware/authorization.mjs";
import { requestLog } from "./middleware/requestsLog.mjs";

import { postUserController, getAllUsersController } from "./controllers/usersControllers.mjs";
import { deleteTaskController, getOneTaskController, getAllTasksController, postTaskController, putTaskController } from "./controllers/tasksControllers.mjs";

const PATH_PREFIX = "/api/v0.0"
const app = express();
try {
    const jsonParser = express.json();
    app.use(requestLog);
    
    // User Endpoints.
    app.post(PATH_PREFIX+"/users/", jsonParser, postUserController);
    app.get(PATH_PREFIX+"/the-users", getAllUsersController);

    // Tasks endpoints.
    app.get(PATH_PREFIX+"/tasks/:id", authMiddleware, getOneTaskController);
    app.get(PATH_PREFIX+"/tasks/", authMiddleware, getAllTasksController);
    app.post(PATH_PREFIX+"/task/", authMiddleware, jsonParser, postTaskController);
    app.put(PATH_PREFIX+"/task/", authMiddleware, jsonParser, putTaskController);
    app.delete(PATH_PREFIX+"/task/", authMiddleware, jsonParser, deleteTaskController);

    app.listen(process.env.PORT || 3000,()=>{
        console.log("Express running...");
    });
} catch (err) {
    console.error(err);
}