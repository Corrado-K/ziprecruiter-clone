import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// get all job posts
export const getAllJobPosts =  async () => {}

// get job post by id
export const getJobPostById =  async () => {}

// get job post by job title, location, experience
export const getJobPostBySearch =  async () => {}

// add job post
export const addJobPost =  async () => {}

// update job post
export const updateJobPost =  async () => {}

// delete job post
export const deleteJobPost =  async () => {}