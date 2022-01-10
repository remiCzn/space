import dotenv from "dotenv";

dotenv.config();

const env: {
  LOGGING: boolean;
  JWT_SIGN: string;
  JWT_EXPIRES: number;
  DB_URL: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_PORT: number;
} = {
  LOGGING: JSON.parse(process.env.LOGGING!),
  JWT_SIGN: process.env.JWT_SIGN!,
  JWT_EXPIRES: JSON.parse(process.env.JWT_EXPIRES!),
  DB_URL: process.env.DB_URL!,
  DB_USER: process.env.DB_USER!,
  DB_PASSWORD: process.env.DB_PASSWORD!,
  DB_PORT: JSON.parse(process.env.DB_PORT!),
};

export default env;
