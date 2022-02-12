import env from "../env";
import jwtUtils from "../utils/jwt.utils";
import bcrypt from "bcrypt";
import {UserRepository} from "../database/user";
import {Token} from "../models/login.api";

export class AuthBusinessController {
    public readonly TOKEN_COOKIE_NAME: string;
    private userRepo: UserRepository;

    public constructor() {
        this.TOKEN_COOKIE_NAME = "token";
        this.userRepo = new UserRepository();

        this.checkLogin = this.checkLogin.bind(this);
        this.checkToken = this.checkToken.bind(this);
        this.login = this.login.bind(this);
    }

    public async checkLogin(token: string): Promise<{ userId: number, username: string } | undefined> {
        if (!token) {
            return undefined;
        }
        try {
            const UserId: number = jwtUtils.verify(token).userId;
            const user = await this.userRepo.getUserById(UserId);
            return {
                userId: UserId,
                username: user.username,
            };
        } catch {
            return undefined;
        }
    }

    public async checkToken(token: string): Promise<boolean> {
        if (!token) {
            return false;
        }
        try {
            jwtUtils.verify(token).userId;
            return true;
        } catch {
            return false;
        }
    }

    public async login(email?: string, password?: string)
        : Promise<{ message: string, status: number, token?: Token }> {
        if (email === undefined || password === undefined) {
            return {
                status: 400,
                message: "Invalid parameter(s)"
            }
        }
        const users = await this.userRepo
            .getUserByEmail(email)
            .then((qUsers) => {
                return qUsers;
            })
            .catch(() => {
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
                return {
                    message: "Logged in",
                    status: 200,
                    token: {
                        token: token,
                        tokenName: this.TOKEN_COOKIE_NAME,
                        parameters: {
                            httpOnly: false,
                            secure: true,
                            expires: new Date(Date.now() + env.JWT_EXPIRES),
                        }
                    }
                }
            } else {
                return {status: 403, message: "Wrong password"};
            }
        } else {
            return {status: 400, message: "This user doesn't exists"};
        }
    }
}
