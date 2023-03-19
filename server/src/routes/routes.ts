import { Router } from "express"
import userRoutes from "./user.routes"

const router = Router()

const prefix = '/api/v1'

router.use(prefix + '/auth', userRoutes)

export default router