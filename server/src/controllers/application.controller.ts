import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// get all applications
export const getAllApplicationsByRecruiter =  async () => {}

// get all applications
export const getAllApplicationsByCandidate =  async () => {}

// get application by id
export const getApplicationById =  async (
     req: Request,
     res: Response,
     next: NextFunction
) => {

     try {

          const application = await prisma.application.findFirst({
               where: {
                    id: req.params.application_id
               }
          });

          res.send({
               message: `Application added`,
               status: 200,
               payload: application,
          });
          
     } catch (error) {
          next(error)
     }
}

// add application
export const addApplication =  async (
     req: Request,
     res: Response,
     next: NextFunction
) => {
     const { resume } = req.body

     try {
          await prisma.user.findFirst({
               where: {
                    id: res.locals?.user.id,
               },
          });

          const application = await prisma.application.create({
               data: {
                    resume: resume,
                    candidate_id: res.locals?.user.id,
                    job_post_id: req.params.post_id,
               },
          });

          res.send({
               message: `Application added`,
               status: 200,
               payload: application,
          });
     } catch (error) {
          next(error)
     }
}

// update application
export const updateApplicationStatus =  async (
     req: Request,
     res: Response,
     next: NextFunction
) => {
     const { status } = req.body

     try {
          const isCreator = await prisma.application.findFirst({
               include: { job_post: true },
               where: {
                    id: req.params.application_id,
                    job_post: {
                         recruiter_id: res.locals?.user.id
                    }
               },
          });

          if (isCreator) {
               await prisma.application.update({
                    where: {
                         id: req.params.application_id
                    },
                    data: {
                         status: status
                    }
               })

               res.send({
                    message: `Application updated`,
                    status: 200,
               });
          }

     } catch (error) {
          next(error)
     }
}

// delete application
export const deleteApplication =  async (
     req: Request,
     res: Response,
     next: NextFunction
) => {

     try {
          const isApplicant = await prisma.application.findFirst({
               where: {
                    id: req.params.application_id,
                    candidate_id: res.locals?.user.id
               },
          });

          if (isApplicant) {
               await prisma.application.delete({
                    where: {
                         id: req.params.application_id
                    },
               })

               res.send({
                    message: `Application deleted`,
                    status: 200,
               });
          }

     } catch (error) {
          next(error)
     }
}