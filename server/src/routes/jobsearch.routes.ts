import { Router } from "express";
import { getJobPostBySearch } from '../controllers/jobpost.controller';

const router = Router();


router.post('/', getJobPostBySearch) // search for job posts by keywords

 
export default router;