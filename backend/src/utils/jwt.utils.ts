import jwt from "jsonwebtoken";
import env from "../env";

export default {
  sign(object: object): string {
    return jwt.sign(object, env.JWT_SIGN);
  },
  verify(token: string): string {
    return jwt.verify(token, env.JWT_SIGN).toString();
  },
};
