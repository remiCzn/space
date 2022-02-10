import {user as User} from "@prisma/client";
import dbRepository, {AccessDatabaseError} from "./db";

export class UserRepository extends dbRepository {
    public constructor() {
        super();
    }

    public async getUserById(userId: number): Promise<User> {
        return this.db().user.findUnique({
            where: {
                id: userId
            }
        }).then((user) => {
            if (user === null) {
                throw new Error("This user doesn't exists");
            }
            return user;
        }).catch((err) => {
            throw new AccessDatabaseError(err);
        });
    }

    public async getUserByEmail(userEmail: string): Promise<Array<User>> {
        return this.db().user.findMany({
            where: {
                email: userEmail
            }
        }).catch((err) => {
            throw new AccessDatabaseError(err);
        });
    }

    public async createUser(
        email: string,
        password: string,
        username: string
    ): Promise<void> {
        await this.db().user.create({
            data: {
                username: username,
                password: password,
                email: email
            }
        }).catch((err) => {
            throw new AccessDatabaseError(err);
        });
        return;
    }

    public async changeUsername(userId: number, username: string): Promise<void> {
        await this.db().user.update({
            where: {
                id: userId
            },
            data: {
                username: username
            }
        }).catch((err) => {
            throw new AccessDatabaseError(err);
        });
        return;
    }
}
