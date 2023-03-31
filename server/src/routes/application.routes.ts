import { Router } from "express";
import { jwtAuth } from "../middlewares/middleware.jwtAuth";
import { addApplication, deleteApplication, getAllApplicationsByCandidate, getAllApplicationsForRecruiter, getApplicationById, getResume, updateApplicationStatus } from "../controllers/application.controller";
import { upload } from "../middlewares/middleware.fileHandler";


const router = Router();


router.get('/received', jwtAuth, getAllApplicationsForRecruiter) // get all recriter's received applications
router.get('/myapplications', jwtAuth, getAllApplicationsByCandidate) // get all candidate applications

router.get('/file/:application_id', jwtAuth, getResume)

router.get('/:application_id', getApplicationById) // get applicaton by id
router.post('/', jwtAuth, upload.single('resume'), addApplication) // add job application
router.put('/:application_id', jwtAuth, updateApplicationStatus) // update job application status
router.delete('/:application_id', jwtAuth, deleteApplication) // delete job application

export default router;
