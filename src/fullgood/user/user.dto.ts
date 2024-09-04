export class User {
    name: string;
    mail: string;
    password: string;
    status: Status;
}

export enum Status {
    CONNECTED,
    DETACHED,
    BLOCKED
}