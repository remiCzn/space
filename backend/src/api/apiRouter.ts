import {Router} from "express";
import {FolderBusinessController} from "../controllers/folder";
import {TaskBusinessController} from "../controllers/task";
import {UserBusinessController} from "../controllers/user";
import {AuthApi} from "./auth.api";
import {FileApi} from "./file.api";

export default (() => {
    const authApi = new AuthApi();
    const folderBusiness = new FolderBusinessController();
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
        .post(authApi.authorizationMiddleware, folderBusiness.createFolder);
    apiRouter
        .route("/folder/home")
        .get(authApi.authorizationMiddleware, folderBusiness.getHome);
    apiRouter
        .route("/folder/:id")
        .get(authApi.authorizationMiddleware, folderBusiness.displayFolder)
        .delete(authApi.authorizationMiddleware, folderBusiness.deleteFolder);

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
