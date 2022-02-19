export interface Login {
    email: string;
    password: string;
}

export interface Token {
    tokenName: string,
    token: string,
    parameters: {
        httpOnly: boolean,
        secure: boolean,
        expires: Date
    }
}
