import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// get all job posts
export const getAllJobPosts = async (
     req: Request,
     res: Response,
     next: NextFunction
) => {
     try {
          const posts = await prisma.jobPost.findMany();

          res.send({
               message: "All Posts",
               status: 200,
               payload: posts,
          });
     } catch (error) {
          next(error);
     }
};

// get my job posts
export const getMyJobPosts = async (
     req: Request,
     res: Response,
     next: NextFunction
) => {
     try {
          const posts = await prisma.jobPost.findMany({
               where: {
                    recruiter_id: res.locals?.id
               }
          });

          res.send({
               message: "All My Posts",
               status: 200,
               payload: posts,
          });
     } catch (error) {
          next(error);
     }
};

// get job post by id
export const getJobPostById = async (
     req: Request,
     res: Response,
     next: NextFunction
) => {
     try {
          const post = await prisma.jobPost.findUniqueOrThrow({
               where: {
                    id: req.params.post_id,
               },
          });
          res.send({
               message: `Post ${req.params.id} found`,
               status: 200,
               payload: post,
          });
     } catch (error) {
          next(error);
     }
};

// get job post by job title, location, experience
export const getJobPostBySearch = async (
     req: Request,
     res: Response,
     next: NextFunction
) => {
     const { keywords, location } = req.query;

     let keyword_split = String(keywords).split(" ");
     console.log(keyword_split);

     try {
          // const search_query = await prisma.
          const result = await prisma.jobPost.findMany({
               where: {
                    OR: keyword_split.map(
                         (term) => ({
                              title: {
                                   contains: term,
                              },
                         }),
                         {
                              OR: keyword_split.map((term) => ({
                                   experience: {
                                        contains: term,
                                   },
                              })),
                         }
                    ),
               },
          });

          res.send({
               message: "Search results",
               status: 200,
               payload: result,
          });
     } catch (error) {
          next(error);
     }
};

// add job post
export const addJobPost = async (
     req: Request,
     res: Response,
     next: NextFunction
) => {
     const { title, description, location, experience } = req.body;

     try {
          const user = await prisma.user.findFirst({
               where: {
                    id: res.locals?.user.id,
               },
          });


          if (user && user.role === "RECRUITER") {
               const jobpost = await prisma.jobPost.create({
                    data: {
                         title: title,
                         description: description,
                         location: location,
                         experience: experience,
                         recruiter_id: user.id,
                    },
               });

               res.send({
                    message: `Jobpost added`,
                    status: 200,
                    payload: jobpost,
               });
          } else {
               res.send({
                    message: `User not a RECRUITER`,
                    status: 403,
               });
          }
     } catch (error) {
          next(error);
          // console.log("Error");
     }
};

// update job post
export const updateJobPost = async (
     req: Request,
     res: Response,
     next: NextFunction
) => {
     const { title, description, location, experience } = req.body;

     try {
          const isCreator = await prisma.jobPost.findFirst({
               include: { recruiter: true },
               where: {
                    // ... provide filter here
                    id: req.params.post_id,
                    recruiter: {
                         id: res.locals.user?.id,
                    },
               },
          });

          if (!isCreator) {
               return res.status(403).send({
                    error: "User is not the creator of this post. Cannot perform action",
               });
          }

          if (isCreator && isCreator.recruiter.role === "RECRUITER") {
               const jobpost = await prisma.jobPost.update({
                    where: {
                         id: req.params.post_id,
                    },
                    data: {
                         title: title,
                         description: description,
                         location: location,
                         experience: experience,
                    },
               });

               res.send({
                    message: `Jobpost updated`,
                    status: 200,
                    payload: jobpost,
               });
          } else {
               res.send({
                    message: `User not a RECRUITER`,
                    status: 403,
               });
          }
     } catch (error) {
          next(error);
     }
};

// delete job post
export const deleteJobPost = async (
     req: Request,
     res: Response,
     next: NextFunction
) => {
     try {
          // check if the recruiter is the one who is accessing the post
          const isCreator = await prisma.jobPost.findFirstOrThrow({
               include: { recruiter: true },
               where: {
                    // ... provide filter here
                    id: req.params.post_id,
                    recruiter_id: res.locals.user?.id,
               },
          });

          // if (!isCreator) {
          //      return res.status(403).send({
          //           error: "User is not the creator of this post. Cannot perform action"
          //      })
          // }

          if (isCreator && isCreator.recruiter.role === "RECRUITER") {
               await prisma.jobPost.delete({
                    where: {
                         id: req.params.post_id,
                    },
               });

               res.send({
                    message: `Jobpost deleted`,
                    status: 200,
                    // payload: jobpost
               });
          }
     } catch (error) {
          next(error);
     }
};
