import { Router } from "express";
import auth from "./controllers/auth";
import test from "./controllers/test";
import user from "./controllers/user";

export default (() => {
  const apiRouter: Router = Router();
  apiRouter.route("/register").post(user.register);
  apiRouter.route("/user").get(auth.authMiddleware, user.getMe);
  apiRouter.route("/user").put(auth.authMiddleware, user.updateUser);
  apiRouter.route("/login").post(auth.login);
  apiRouter.route("/logout").get(auth.logout);
  apiRouter.route("/authentified").get(auth.authorization);

  apiRouter.route("/test").get(auth.authMiddleware, test.test);

  return apiRouter;
})();
