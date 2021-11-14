import { Router } from "express";
import auth from "./controllers/auth";
import test from "./controllers/test";
import user from "./controllers/user";

export default (() => {
  const apiRouter: Router = Router();
  apiRouter.route("/register").post(user.register);
  apiRouter.route("/user").get(auth.authorization, user.getMe);
  apiRouter.route("/user").put(auth.authorization, user.updateUser);
  apiRouter.route("/login").post(auth.login);
  apiRouter.route("/logout").get(auth.logout);

  apiRouter.route("/test").get(auth.authorization, test.test);

  return apiRouter;
})();
