import { Register } from "../models/api/register.api";
import { UserApi, GetUserApi, PostUserApi } from "../models/api/user.api";
import User from "../models/database/user.model";
import {
  checkArguments,
  checkEmail,
  checkPassword,
} from "../utils/check.utils";
import { ApiRequest, ApiResponse } from "../utils/expressUtils";
import bcrypt from "bcrypt";

export default {
  register: async (
    req: ApiRequest<Register>,
    res: ApiResponse<{ message: string }>
  ) => {
    if (
      !checkArguments(req.body.email, req.body.password, req.body.username) ||
      !checkEmail(req.body.email) ||
      !checkPassword(req.body.password)
    ) {
      res.status(400).json({ message: "Invalid parameter(s)" });
      return;
    }
    const email: string = req.body.email.trim();
    const password: string = req.body.password.trim();
    const username: string = req.body.username.trim();
    const users: Array<any> = await User.find({ email: email });
    if (users.length == 0) {
      bcrypt.hash(password, 10).then((hashPw) => {
        const newUser = new User({
          email: email,
          password: hashPw,
          username: username,
        });
        newUser.save();
        res.status(200).json({ message: "new user registered" });
      });
    } else {
      res.status(400).json({ message: "This user already exists" });
    }
  },

  getMe: (req: ApiRequest<any>, res: ApiResponse<GetUserApi>) => {
    const user: UserApi | undefined = req.user;
    if (user == undefined) {
      return res.status(500).json({
        message: "Can't retrieve the informatons for the user",
        username: "",
        firstname: "",
        lastname: "",
      });
    }
    return res.status(200).json({
      message: "Success",
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
    });
  },

  updateUser: async (
    req: ApiRequest<PostUserApi>,
    res: ApiResponse<{ message: string }>
  ) => {
    if (req.user == undefined || req.user.userId == undefined) {
      return res.status(400).json({ message: "Unable to retrieve the user" });
    } else {
      if (req.body.username == undefined || req.body.username == null) {
        return res.status(400).json({ message: "Username shouldn't be empty" });
      }
      const userId: string = req.user.userId;
      await User.findByIdAndUpdate(userId, {
        username: req.body.username,
        lastname: req.body.lastname,
        firstname: req.body.firstname,
      });
      return res.status(200).json({ message: "User Updated!" });
    }
  },
};
