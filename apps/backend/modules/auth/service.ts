import { db } from "../../src/db";
import bycrypt from "bcryptjs";

export class AuthService {
    async signUp(username: string, password: string): Promise<string> {
        const hashedPassword = await bycrypt.hash(password,10);
        const user = await db.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });
        return user.id;
    }
    async signIn(username: string, password: string): Promise<any> {
        const user = await db.user.findUnique({
            where: {
                username,
            },
        });
        if (!user || !(await bycrypt.compare(password,user.password))) {
            throw new Error("Invalid username or password");
        }
        return user;
    }
}
