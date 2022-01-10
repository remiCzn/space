import { Request, Response } from "express";
import * as core from "express-serve-static-core";
import { UserApi } from "../models/user.api";

export interface ApiRequest<T>
  extends Request<core.ParamsDictionary, any, T, core.Query> {
  user?: UserApi;
}

export type ApiResponse<T> = Response<T, Record<string, any>>;
