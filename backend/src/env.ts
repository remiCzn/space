import dotenv from "dotenv";

dotenv.config();

const env: {
  LOGGING: boolean;
  JWT_SIGN: string;
  JWT_EXPIRES: number;
} = {
  LOGGING: JSON.parse(process.env.LOGGING!),
  JWT_SIGN: process.env.JWT_SIGN!,
  JWT_EXPIRES: JSON.parse(process.env.JWT_EXPIRES!)
};

export default env;
