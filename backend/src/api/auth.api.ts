import {AuthBusinessController} from "../controllers/auth";
import {ApiRequest, ApiResponse} from "../utils/expressUtils";
import {Login} from "../models/login.api";
import {NextFunction, Response} from "express";

export class AuthApi {
    private authBusiness: AuthBusinessController;

    public constructor() {
        this.authBusiness = new AuthBusinessController();

        this.login = this.login.bind(this);
        this.authorization = this.authorization.bind(this);
        this.authorizationMiddleware = this.authorizationMiddleware.bind(this);
    }

    public async login(
        req: ApiRequest<Login>,
        res: ApiResponse<{ message: string }>
    ) {
        const {status, message, token} = await this.authBusiness.login(req.body.email.trim(), req.body.password.trim());
        console.log(status);
        console.log(message);
        console.log(token);
        if (status === 200 && token !== undefined) {
            res.cookie(token.tokenName, token.token, token.parameters).status(status).json({message: message});
        } else {
            res.status(status).json({message: message});
        }
    }

    public logout(req: ApiRequest<{}>, res: ApiResponse<{ message: string }>) {
        return res
            .clearCookie(this.authBusiness.TOKEN_COOKIE_NAME)
            .status(200)
            .json({message: "Logged out"});
    }

    public async authorization(req: ApiRequest<any>, res: Response) {
        const token = req.cookies.token;
        return res.send(await this.authBusiness.checkToken(token));
    }

    public async authorizationMiddleware(req: ApiRequest<any>, res: Response, next: NextFunction) {
        const token = req.cookies.token;
        const user = await this.authBusiness.checkLogin(token);
        if (user === undefined) {
            return res.sendStatus(403);
        } else {
            req.user = user;
            return next();
        }
    }
}