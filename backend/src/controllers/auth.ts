import { Response, NextFunction } from "express";
import env from "../env";
import { Login } from "../models/api/login.api";
import { ApiRequest, ApiResponse } from "../utils/expressUtils";
import jwtUtils from "../utils/jwt.utils";

const TOKEN_COOKIE_NAME = "token";

export default {
  authorization: (req: ApiRequest<any>, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      return res.sendStatus(403);
    }
    try {
      console.log(1);
      const data = jwtUtils.verify(token);
      console.log(1);
      req.username = data;
      console.log(1);
      return next();
    } catch {
      return res.sendStatus(403);
    }
  },
  login: (req: ApiRequest<Login>, res: ApiResponse<{ message: string }>) => {
    const token = jwtUtils.sign(req.body);
    return res
      .cookie(TOKEN_COOKIE_NAME, token, {
        httpOnly: false,
        secure: true,
        expires: new Date(Date.now() + env.JWT_EXPIRES),
      })
      .status(200)
      .json({ message: "Logged in" });
  },
  logout: (req: ApiRequest<{}>, res: ApiResponse<{ message: string }>) => {
    return res
      .clearCookie(TOKEN_COOKIE_NAME)
      .status(200)
      .json({ message: "Logged out" });
  },
};
