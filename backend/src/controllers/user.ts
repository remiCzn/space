import { Register } from "../models/api/register.api";
import User from "../models/database/user.model";
import {
  checkArguments,
  checkEmail,
  checkPassword,
} from "../utils/check.utils";
import { ApiRequest, ApiResponse } from "../utils/expressUtils";

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
      const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
      });
      newUser.save();
      res.status(200).json({ message: "new user registered" });
    } else {
      res.status(400).json({ message: "This user already exists" });
    }
  },
};
