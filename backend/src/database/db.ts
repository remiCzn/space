import {PrismaClient} from "@prisma/client";

export default class dbRepository {
    private prisma = new PrismaClient()

    protected db() {
        return this.prisma;
    }
}

export class AccessDatabaseError extends Error {
    constructor(err: any) {
        console.error(err);
        super("Unable to access database");
        this.name = "AccessDatabaseError";
    }
}
