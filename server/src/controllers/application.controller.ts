import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from "@prisma/client";
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient();

// get all applications received
export const getAllApplicationsForRecruiter =  async (
     req: Request,
     res: Response,
     next: NextFunction
) => {
     try {
          // need to do the logic for this query

          const userJobPosts = await prisma.jobPost.findMany({
               where: {
                 recruiter_id: res.locals.user?.id
               },
               include: {
                    applications: {
                         select: {
                              id: true,
                              status: true,
                              resume: true,
                              candidate: {
                                   select: {
                                        fname: true,
                                        lname: true,
                                        email: true
                                   }
                              }
                         }
                    }
               }
          })
          
          const myApplications = userJobPosts.flatMap(jobPost => jobPost.applications)   



          res.send({
               message: `My Received Applications`,
               status: 200,
               payload: myApplications,
          })
     } catch (error) {
          next(error)
     }
}

// get all myapplications
export const getAllApplicationsByCandidate =  async (
     req: Request,
     res: Response,
     next: NextFunction
) => {
     try {
          
          const myApplications = await prisma.application.findMany({
               where: {
                    candidate_id: res.locals?.user.id
               },
               include: {
                    job_post: {
                         select: {
                              id: true,
                              title: true,
                              experience: true,
                         }
                    }
               }
          })      


          res.send({
               message: `My Applications`,
               status: 200,
               payload: myApplications,
          })
     } catch (error) {
          console.log(error);
          next(error)
     }
}

// get application by id
export const getApplicationById =  async (
     req: Request,
     res: Response,
     next: NextFunction
) => {

     try {

          const application = await prisma.application.findFirst({
               where: {
                    id: req.params.application_id,
                    job_post_id: req.params.jobpost_id
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
     const { jobpost_id } = req.body

     try {
          await prisma.user.findFirst({
               where: {
                    id: res.locals?.user.id,
               },
          });

          const application = await prisma.application.create({
               data: {
                    resume: req.file?.path || '',
                    candidate_id: res.locals?.user.id,
                    job_post_id: jobpost_id,
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
                    // include: { ApplicationStatus },
                    where: {
                         id: req.params.application_id
                    },
                    data: {
                         status:  status
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


export const getResume = async (
     req: Request,
     res: Response,
     next: NextFunction
) => {
     
     try {
          const application = await prisma.application.findUnique({
               where: {
                    id: req.params.application_id,
               },
          });

          const fileName = application?.resume
          const filePath = path.resolve(__dirname,'../..') + '\\' + fileName

          console.log(fileName);
          

          // 'C:\\Code\\RGT\\ZipRecruiterClone\\server\\'
          fs.access(filePath, fs.constants.F_OK, (error) => {
               if (error) {
                    res.status(404).send('File not found!')
               } else {
                    res.send({
                         message: `Application deleted`,
                         status: 200,
                         payload: fileName
                    });
                    // res.sendFile(filePath)
               }
          })


          // res.send({
          //      message: `Application deleted`,
          //      status: 200,
          // });
          

     } catch (error) {
          next(error)
     }
};

