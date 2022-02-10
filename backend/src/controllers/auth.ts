import {Response, NextFunction} from "express";
import env from "../env";
import {Login} from "../models/login.api";
import {checkArguments} from "../utils/check.utils";
import {ApiRequest, ApiResponse} from "../utils/expressUtils";
import jwtUtils from "../utils/jwt.utils";
import bcrypt from "bcrypt";
import {UserRepository} from "../database/user";

export class AuthBusinessController {
    private TOKEN_COOKIE_NAME: string;
    private userRepo: UserRepository;

    public constructor() {
        this.TOKEN_COOKIE_NAME = "token";
        this.userRepo = new UserRepository();

        this.AuthMiddleware = this.AuthMiddleware.bind(this);
        this.authorization = this.authorization.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    public async AuthMiddleware(
        req: ApiRequest<any>,
        res: Response,
        next: NextFunction
    ) {
        const token = req.cookies.token;
        if (!token) {
            return res.sendStatus(403);
        }
        try {
            const UserId: number = jwtUtils.verify(token).userId;
            const user = await this.userRepo.getUserById(UserId);
            req.user = {
                userId: UserId,
                username: user.username,
            };
            return next();
        } catch {
            return res.sendStatus(403);
        }
    }

    public async authorization(req: ApiRequest<any>, res: Response) {
        const token = req.cookies.token;
        if (!token) {
            return res.send(false);
        }
        try {
            const UserId = jwtUtils.verify(token).userId;
            const user = await this.userRepo.getUserById(UserId);
            return res.send(true);
        } catch {
            return res.send(false);
        }
    }

    public async login(
        req: ApiRequest<Login>,
        res: ApiResponse<{ message: string }>
    ) {
        if (!checkArguments(req.body.email, req.body.password)) {
            return res.status(400).json({message: "Invalid parameter(s)"});
        }
        const email: string = req.body.email.trim();
        const password: string = req.body.password.trim();
        const users = await this.userRepo
            .getUserByEmail(email)
            .then((qUsers) => {
                return qUsers;
            })
            .catch((err) => {
                return [];
            });
        if (users.length > 0) {
            const user = users[0];
            const validPassword: boolean = await bcrypt.compare(
                password,
                user.password
            );
            if (validPassword) {
                const token: string = jwtUtils.sign({
                    userId: user.id,
                });
                return res
                    .cookie(this.TOKEN_COOKIE_NAME, token, {
                        httpOnly: false,
                        secure: true,
                        expires: new Date(Date.now() + env.JWT_EXPIRES),
                    })
                    .status(200)
                    .json({message: "Logged in"});
            } else {
                return res.status(403).json({message: "Wrong password"});
            }
        } else {
            return res.status(400).json({message: "This user doesn't exists"});
        }
    }

    public logout(req: ApiRequest<{}>, res: ApiResponse<{ message: string }>) {
        return res
            .clearCookie(this.TOKEN_COOKIE_NAME)
            .status(200)
            .json({message: "Logged out"});
    }
}
