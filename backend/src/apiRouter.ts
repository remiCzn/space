import { Router } from "express";
import auth from "./controllers/auth";
import user from "./controllers/user";
import folder from "./controllers/folder";

export default (() => {
  const apiRouter: Router = Router();
  apiRouter.route("/register").post(user.register);
  apiRouter.route("/user").get(auth.authMiddleware, user.getMe);
  apiRouter.route("/user").put(auth.authMiddleware, user.updateUser);
  apiRouter.route("/login").post(auth.login);
  apiRouter.route("/logout").get(auth.logout);
  apiRouter.route("/authentified").get(auth.authorization);

  apiRouter.route("/folder").post(auth.authMiddleware, folder.createFolder);
  apiRouter.route("/folder/home").get(auth.authMiddleware, folder.getHome);
  apiRouter.route("/folder/:id").get(auth.authMiddleware, folder.displayFolder);
  return apiRouter;
})();
