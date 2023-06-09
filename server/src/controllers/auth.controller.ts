import { Request, Response, NextFunction } from 'express';
import { comparePassword, hashPassword } from "../utils/util.password";
import { PrismaClient } from "@prisma/client";
import { generateAccessToken, generateRefreshToken, setRefreshToken } from '../utils/util.token';
import * as jwt from 'jsonwebtoken'

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response, next: NextFunction) => {
     const { email, fname, lname, password } = req.body;
     const hashedPassword = await hashPassword(password);

     try {
          const isDuplicateUser = await prisma.user.findFirst({
               where: {
                    email: email,
               },
          });

          if (isDuplicateUser) {
               return next(res.status(409).json({
                    message: `User with this email already exists`,
               }))
          }

          const newUser = await prisma.user.create({
               data: {
                    email,
                    fname,
                    lname,
                    password: hashedPassword,
               },
          });

          if (!newUser) {
               return next(res.status(404).json({
                    errors: [{
                         message: `User not added`
                    }]
               }))
          }

          res.send({
               message: "User created",
               status: 200
          });
     } catch (error) {
          next(error)
     }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
     const { email, password } = req.body;

     try {
          const user = await prisma.user.findUnique({ where: { email: email } });

          if (!user) {
               return next(res.status(404).json({ message: 'User with email not found' }))
          }

          const verifiedPassword = await comparePassword(
               user?.password,
               password
          );

          if (!verifiedPassword) {
               return next(res.status(401).json({ message: "Incorrect password" }))
          }

          // do jwt tokenizing here
          const jwtTokenPayload = {
               id: user?.id,
               email: user?.email,
               fname: user?.fname,
               lname: user?.lname,
               role: user?.role
          }
          // console.log(jwtTokenPayload);
          
          // generate access token
          const accessToken = generateAccessToken(jwtTokenPayload)
          // generate and set refresh token
          const refreshToken = generateRefreshToken(jwtTokenPayload)
          setRefreshToken(res, refreshToken)

          res.send({
               accessToken: accessToken,
               refreshToken: refreshToken
          });
     } catch (error) {
          next(error)
     }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {

     const {token} =  req.body
     let user: jwt.JwtPayload;

     try {
          user = jwt.verify(
               token,
               process.env.REFRESH_TOKEN as jwt.Secret
          ) as jwt.JwtPayload;

          // get the old refresh token and check if it exists
          // if it exists, create new token
          // LEARN ABOUT REDIS AND ADDING OLD REFRESH TOKENS TO CACHE
          // const oldRefreshToken = user.token_id as string;

          const jwtTokenPayload = {
               id: user?.id,
               email: user?.email,
               fname: user?.fname,
               lname: user?.lname,
               role: user?.role
          }

          const accessToken = generateAccessToken(jwtTokenPayload)
          const refreshToken = generateRefreshToken(jwtTokenPayload)
          setRefreshToken(res, refreshToken)
          res.send({
               accessToken: accessToken,
               refreshToken: refreshToken
          });
     } catch (error) {
          next(error)
     }
}

export const deleteUserAccount = async (req: Request, res: Response, next: NextFunction) => {

     const { email, password } = req.body

     try {

          await prisma.user.findFirst({
               where: {
                    id: req.params.id,
               }
          })

          const user = await prisma.user.findUnique({ where: { email: email } });

          if (!user) {
               return res.status(404).json({ message: 'User with email not found' });
          }
      
          const passwordVerified = await comparePassword(user.password, password);
      
          if (!passwordVerified) {
               return res.status(401).json({ message: 'Incorrect password' });
          }
      
          const deleteUser = await prisma.user.delete({
               where: {
               email: email,
               },
          });

          res.send({
               message: "User deleted",
               status: 200,
               payload: deleteUser
          })
     } catch (error) {
          next(error)

     }
}

export const logout = (req: Request, res: Response) => {
     setRefreshToken(res, "");
     return res.status(200).json({ OK: true });
};
