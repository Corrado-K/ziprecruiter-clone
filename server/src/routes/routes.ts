import { Router } from "express"
import userRoutes from "./user.routes"
import jobRoutes from "./jobpost.routes"
import applicationRoutes from "./application.routes"
import jobSearchRoutes from './jobsearch.routes'

const router = Router()


router.use('/api/v1/auth', userRoutes)
router.use('/api/v1/posts', jobRoutes)
router.use('/api/v1/application', applicationRoutes)
router.use('/api/v1/jobsearch', jobSearchRoutes)

export default router