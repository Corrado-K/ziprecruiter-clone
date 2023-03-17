import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN = process.env.ACCESS_TOKEN as jwt.Secret

export const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
     const authHeaders = req.headers.authorization

     if (!authHeaders) {
          return res.status(401).json({
               message: `Auth headers not found`
          })
     }
     const accessToken = authHeaders.split(' ')[1]

     jwt.verify(accessToken, ACCESS_TOKEN , async (error: any, userData) => {
          // pass error to next
          if (error) {
               return res.status(403).json({
                    error: error
               })
          }
          res.locals.user = userData as jwt.JwtPayload
          next()
     })

}