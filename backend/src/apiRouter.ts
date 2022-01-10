import { Router } from "express";
import { AuthBusinessController } from "./controllers/auth";
import { FolderBusinessController } from "./controllers/folder";
import { TaskBusinessController } from "./controllers/task";
import { UserBusinessController } from "./controllers/user";

export default (() => {
  const authBusiness = new AuthBusinessController();
  const folderBusiness = new FolderBusinessController();
  const userBusiness = new UserBusinessController();
  const taskBusiness = new TaskBusinessController();

  const apiRouter: Router = Router();
  apiRouter.route("/register").post(userBusiness.register);
  apiRouter.route("/user").get(authBusiness.AuthMiddleware, userBusiness.getMe);
  apiRouter
    .route("/user")
    .put(authBusiness.AuthMiddleware, userBusiness.updateUser);
  apiRouter.route("/login").post(authBusiness.login);
  apiRouter.route("/logout").get(authBusiness.logout);
  apiRouter.route("/authentified").get(authBusiness.authorization);

  apiRouter
    .route("/folder")
    .post(authBusiness.AuthMiddleware, folderBusiness.createFolder);
  apiRouter
    .route("/folder/home")
    .get(authBusiness.AuthMiddleware, folderBusiness.getHome);
  apiRouter
    .route("/folder/:id")
    .get(authBusiness.AuthMiddleware, folderBusiness.displayFolder)
    .delete(authBusiness.AuthMiddleware, folderBusiness.deleteFolder);

  apiRouter
    .route("/tasks")
    .get(authBusiness.AuthMiddleware, taskBusiness.getTasks);
  apiRouter
    .route("/task")
    .post(authBusiness.AuthMiddleware, taskBusiness.createTask);
  return apiRouter;
})();
