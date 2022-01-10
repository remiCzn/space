import { Router } from "express";
import { AuthBusinessController } from "./controllers/auth";
import { FolderBusinessController } from "./controllers/folder";
import { UserBusinessController } from "./controllers/user";

const authBusiness = new AuthBusinessController();
const folderBusiness = new FolderBusinessController();
const userBusiness = new UserBusinessController();

export default (() => {
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
  return apiRouter;
})();
