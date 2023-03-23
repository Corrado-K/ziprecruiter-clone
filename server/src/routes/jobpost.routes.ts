import { Router } from "express";
import { addJobPost, deleteJobPost, getAllJobPosts, getJobPostById, getJobPostBySearch, getMyJobPosts, updateJobPost } from '../controllers/jobpost.controller';
import { jwtAuth } from "../middlewares/middleware.jwtAuth";
import { addApplication, deleteApplication, getAllApplicationsByCandidate, getAllApplicationsByRecruiter, getApplicationById, updateApplicationStatus } from "../controllers/application.controller";


const router = Router();

router.get('/', getAllJobPosts) // getall job post
router.get('/myposts/', getMyJobPosts) // getall job post
router.get('/:post_id', getJobPostById) // get job post
router.post('/', jwtAuth, addJobPost) // add job post
router.put('/:post_id', jwtAuth, updateJobPost) // update job post
router.delete('/:post_id', jwtAuth, deleteJobPost) // delete job post


router.get('/:post_id/application/:application_id', getApplicationById) // get applicaton by id
router.post('/:post_id/application/', jwtAuth, addApplication) // add job application
router.put('/:post_id/application/:application_id', jwtAuth, updateApplicationStatus) // update job post
router.delete('/:post_id/application/:application_id', jwtAuth, deleteApplication) // delete job post

 
export default router;
