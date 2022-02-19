import {Router} from "express";
import {TaskBusinessController} from "../controllers/task";
import {UserBusinessController} from "../controllers/user";
import {AuthApi} from "./auth.api";
import {FileApi} from "./file.api";
import {FolderApi} from "./folder.api";

export default (() => {
    const authApi = new AuthApi();
    const folderApi = new FolderApi();
    const userBusiness = new UserBusinessController();
    const taskBusiness = new TaskBusinessController();
    const fileApi = new FileApi();

    const apiRouter: Router = Router();
    apiRouter.route("/register").post(userBusiness.register);
    apiRouter.route("/user").get(authApi.authorizationMiddleware, userBusiness.getMe);
    apiRouter
        .route("/user")
        .put(authApi.authorizationMiddleware, userBusiness.updateUser);
    apiRouter.route("/login").post(authApi.login);
    apiRouter.route("/logout").get(authApi.logout);
    apiRouter.route("/authentified").get(authApi.authorization);

    apiRouter
        .route("/folder")
        .post(authApi.authorizationMiddleware, folderApi.createFolder);
    apiRouter
        .route("/folder/home")
        .get(authApi.authorizationMiddleware, folderApi.getHome);
    apiRouter
        .route("/folder/:id")
        .get(authApi.authorizationMiddleware, folderApi.displayFolder)
        .delete(authApi.authorizationMiddleware, folderApi.deleteFolder);

    apiRouter
        .route("/tasks")
        .get(authApi.authorizationMiddleware, taskBusiness.getTasks);
    apiRouter
        .route("/task")
        .post(authApi.authorizationMiddleware, taskBusiness.createTask);
    apiRouter
        .route("/task/:id")
        .delete(authApi.authorizationMiddleware, taskBusiness.deleteTask);

    apiRouter.route("/file/upload").post(fileApi.upload);
    apiRouter.route("/file/files").get(fileApi.getListFiles);

    return apiRouter;
})();
