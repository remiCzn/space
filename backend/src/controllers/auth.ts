import { Response, NextFunction } from "express";
import env from "../env";
import { Login } from "../models/api/login.api";
import userModel from "../models/database/user.model";
import User from "../models/database/user.model";
import { checkArguments } from "../utils/check.utils";
import { ApiRequest, ApiResponse } from "../utils/expressUtils";
import jwtUtils from "../utils/jwt.utils";

const TOKEN_COOKIE_NAME = "token";

export default {
  authorization: async (
    req: ApiRequest<any>,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.cookies.token;
    if (!token) {
      return res.sendStatus(403);
    }
    try {
      const UserId = jwtUtils.verify(token).userId;
      const user = await userModel.findById(UserId);
      req.user = { userId: UserId, username: user.username };
      return next();
    } catch {
      return res.sendStatus(403);
    }
  },
  login: async (
    req: ApiRequest<Login>,
    res: ApiResponse<{ message: string }>
  ) => {
    if (!checkArguments(req.body.email, req.body.password)) {
      return res.status(400).json({ message: "Invalid parameter(s)" });
    }
    const email: string = req.body.email.trim();
    const password: string = req.body.password.trim();
    const users = await User.find({ email: email });

    if (users.length > 0) {
      const user = users[0];
      if (password === user.password) {
        const token: string = jwtUtils.sign({
          userId: user._id,
        });
        return res
          .cookie(TOKEN_COOKIE_NAME, token, {
            httpOnly: false,
            secure: true,
            expires: new Date(Date.now() + env.JWT_EXPIRES),
          })
          .status(200)
          .json({ message: "Logged in" });
      } else {
        return res.status(403).json({ message: "Wrong password" });
      }
    } else {
      return res.status(400).json({ message: "This user doesn't exists" });
    }
  },
  logout: (req: ApiRequest<{}>, res: ApiResponse<{ message: string }>) => {
    return res
      .clearCookie(TOKEN_COOKIE_NAME)
      .status(200)
      .json({ message: "Logged out" });
  },
};
