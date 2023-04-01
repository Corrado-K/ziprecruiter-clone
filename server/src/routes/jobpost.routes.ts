import { Router } from "express";
import { addJobPost, deleteJobPost, getAllJobPosts, getJobPostById, getJobPostBySearch, getMyJobPosts, updateJobPost } from '../controllers/jobpost.controller';
import { jwtAuth } from "../middlewares/middleware.jwtAuth";
import { addApplication, deleteApplication, getAllApplicationsByCandidate, getAllApplicationsForRecruiter, getApplicationById, updateApplicationStatus } from "../controllers/application.controller";
import { validateInput } from '../middlewares/middleware.validateInput';
import { postSchema } from "../schema";


const router = Router();

router.get('/', getAllJobPosts) // getall job post
router.get('/myposts/', jwtAuth, getMyJobPosts) // get all my job post
router.get('/:post_id', getJobPostById) // get job post
router.post('/', jwtAuth, validateInput(postSchema), addJobPost) // add job post
router.put('/:post_id', jwtAuth, validateInput(postSchema), updateJobPost) // update job post
router.delete('/:post_id', jwtAuth, deleteJobPost) // delete job post

export default router;
