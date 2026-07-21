import { z } from "zod";

export const AuthModel = {
    SignUpSchema: z.object({
        username: z.string().min(3).max(20),
        password: z.string().min(8),
    }),
    SignInSchema: z.object({
        username: z.string().min(3).max(20),
        password: z.string().min(8),
    }),
};