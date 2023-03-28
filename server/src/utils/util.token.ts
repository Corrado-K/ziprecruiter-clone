import jwt from "jsonwebtoken";
import { Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

const ACCESS_TOKEN = process.env.ACCESS_TOKEN as jwt.Secret
const REFRESH_TOKEN = process.env.REFRESH_TOKEN as jwt.Secret

interface IUserIDPayload extends JwtPayload {
     id: string;
     email: string;
     firstName: string;
     lastName: string;
}

export const generateAccessToken = (payload: any) => {
     return jwt.sign(payload, ACCESS_TOKEN, {
          expiresIn: '30m'
     })
}

export const generateRefreshToken = (payload: any) => {
     return jwt.sign(payload, REFRESH_TOKEN, {
          expiresIn: '7d'
     })
}

export const verifyAccessToken = (token: string) => {
     const payload = jwt.verify(token, ACCESS_TOKEN)
     return payload as IUserIDPayload
}

export const verifyRefreshToken = (token: string) => {
     const payload = jwt.verify(token, REFRESH_TOKEN)
     return payload as IUserIDPayload
}

export const setRefreshToken = (res: Response, token: string) => {
     return res.cookie('refresh_token', token, {
          httpOnly: true
     })
}

// export const signAccessToken = (id: number, email: string, role: string, tokenId: string): string => {
//      return jwt.sign({ id, email, role, token_id: tokenId }, ACCESS_TOKEN, {
//           expiresIn: 3600,
//      });
// }
   
// export const signRefreshToken = (id: number, email: string, role: string, tokenId: string): string => {
//      return jwt.sign({ id, email, role, token_id: tokenId }, REFRESH_TOKEN, {
//           expiresIn: 86400,
//      });
// }
