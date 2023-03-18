import argon2 from "argon2";

export const hashPassword = async (password: string) => {
     return await argon2.hash(password);
};

export const comparePassword = async ( hashedPassword: string, password: string ) => {
     return await argon2.verify(hashedPassword, password);
};
