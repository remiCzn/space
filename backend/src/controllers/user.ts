import { Register } from "../models/api/register.api";
import User from "../models/database/user.model";
import { ApiRequest, ApiResponse } from "../utils/expressUtils";

export default {
  register: (
    req: ApiRequest<Register>,
    res: ApiResponse<{ message: string }>
  ) => {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
    });
    newUser.save();
    res.status(200).json({ message: "new user registered" });
  },
};
