import {Register} from "../models/register.api";
import {GetUserApi, PostUserApi, UserApi} from "../models/user.api";
import {checkArguments, checkEmail, checkPassword} from "../utils/check.utils";
import {user as User} from "@prisma/client";
import {ApiRequest, ApiResponse} from "../utils/expressUtils";
import bcrypt from "bcrypt";
import {UserRepository} from "../database/user";

export class UserBusinessController {
    private userRepo: UserRepository;

    public constructor() {
        this.userRepo = new UserRepository();

        this.register = this.register.bind(this);
        this.getMe = this.getMe.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    public async register(
        req: ApiRequest<Register>,
        res: ApiResponse<{ message: string }>
    ) {
        if (
            !checkArguments(req.body.email, req.body.password, req.body.username) ||
            !checkEmail(req.body.email) ||
            !checkPassword(req.body.password)
        ) {
            res.status(400).json({message: "Invalid parameter(s)"});
            return;
        }
        const email: string = req.body.email.trim();
        const password: string = req.body.password.trim();
        const username: string = req.body.username.trim();
        const users: Array<User> = await this.userRepo.getUserByEmail(email);
        if (users.length == 0) {
            bcrypt.hash(password, 10).then((hashPw) => {
                this.userRepo
                    .createUser(email, hashPw, username)
                    .then(() => {
                        res.status(200).json({message: "new user registered"});
                    })
                    .catch(() => {
                        res.sendStatus(500);
                    });
            });
        } else {
            res.status(400).json({message: "This user already exists"});
        }
    }

    public async getMe(req: ApiRequest<any>, res: ApiResponse<GetUserApi>) {
        const user: UserApi | undefined = req.user;
        if (user == undefined) {
            return res.status(500).json({
                message: "Can't retrieve the informatons for the user",
                username: "",
            });
        }
        return res.status(200).json({
            message: "Success",
            username: user.username,
        });
    }

    public async updateUser(
        req: ApiRequest<PostUserApi>,
        res: ApiResponse<{ message: string }>
    ) {
        if (req.user == undefined || req.user.userId == undefined) {
            return res.status(400).json({message: "Unable to retrieve the user"});
        } else {
            if (req.body.username == undefined) {
                return res.status(400).json({message: "Username shouldn't be empty"});
            }
            await this.userRepo.changeUsername(req.user.userId, req.body.username);
            return res.status(200).json({message: "User Updated!"});
        }
    }
}
