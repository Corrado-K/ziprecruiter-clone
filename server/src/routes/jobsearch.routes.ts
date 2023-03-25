import { Router } from "express";
import { getJobPostBySearch } from '../controllers/jobpost.controller';

const router = Router();


router.get('', getJobPostBySearch) // search for job posts by keywords

 
export default router;