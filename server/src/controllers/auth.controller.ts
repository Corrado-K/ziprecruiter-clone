import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../utils/util.password";
import { PrismaClient } from "@prisma/client";
import { generateAccessToken, generateRefreshToken, setRefreshToken } from '../utils/util.token';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
     const { email, fname, lname, password } = req.body;
     const hashedPassword = await hashPassword(password);

     try {
          const isDuplicateUser = await prisma.user.findFirst({
               where: {
                    email: email,
               },
          });

          if (isDuplicateUser) {
               return res.status(409).json({
                    message: `User with this email already exists`,
               });
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
               return res.status(404).json({
                    errors: [{
                         message: `User not added`
                    }]
               })
          }

          res.send({
               message: "User created",
               status: 200
          });
     } catch (error) {
          res.status(500).json({
               error: error
          });
     }
};

export const login = async (req: Request, res: Response) => {
     const { email, password } = req.body;

     try {
          const user = await prisma.user.findUnique({ where: { email: email } });

          if (!user) {
               return res.status(404).json({ message: 'User with email not found' });
          }

          const verifiedPassword = await comparePassword(
               user?.password,
               password
          );

          if (!verifiedPassword) {
               return res.status(401).json({ message: "Incorrect password" });
          }

          // do jwt tokenizing here
          const jwtTokenPayload = {
               id: user?.id,
               email: user?.email,
               fname: user?.fname,
               lname: user?.lname
          }
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
          res.status(500).json({
               error: error
          });
     }
};

export const deleteUserAccount = async (req: Request, res: Response) => {

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
          res.status(500).json({
               error: error
          })
     }
}

export const logout = (req: Request, res: Response) => {
     setRefreshToken(res, "");
     return res.status(200).json({ OK: true });
};
