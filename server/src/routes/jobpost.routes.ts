import { Router } from "express";
import { addJobPost, deleteJobPost, getAllJobPosts, getJobPostById, getJobPostBySearch, updateJobPost } from '../controllers/jobpost.controller';
import { jwtAuth } from "../middlewares/middleware.jwtAuth";


const router = Router();

router.get('/', getAllJobPosts) // getall job post
router.get('/:id', getJobPostById) // get job post
router.post('/', jwtAuth, addJobPost) // add job post
router.put('/:id', jwtAuth, updateJobPost) // add job post
router.delete('/:id', jwtAuth, deleteJobPost) // add job post

 
export default router;
