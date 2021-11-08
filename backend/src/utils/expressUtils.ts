import { CorsRequest } from "cors";
import { Request, Response } from "express";
import * as core from "express-serve-static-core";

export interface ApiRequest<T>
  extends Request<core.ParamsDictionary, any, T, core.Query> {
  username?: string;
}

export type ApiResponse<T> = Response<T, Record<string, any>>;
