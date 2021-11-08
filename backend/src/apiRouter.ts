import { Router } from "express";
import auth from "./controllers/auth";
import test from "./controllers/test";
import user from "./controllers/user";

export default (() => {
  const apiRouter: Router = Router();
  apiRouter.route("/register").post(user.register);
  apiRouter.route("/login").post(auth.login);
  apiRouter.route("/logout").get(auth.logout);

  apiRouter.route("/test").post(auth.authorization, test.test);

  return apiRouter;
})();
