import jwt from "jsonwebtoken";
import env from "../env";

export default {
  sign(object: any): string {
    return jwt.sign(object, env.JWT_SIGN);
  },
  verify(token: string): any {
    return jwt.verify(token, env.JWT_SIGN);
  },
};
