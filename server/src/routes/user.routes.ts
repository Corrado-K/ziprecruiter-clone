import { Router } from "express";
import { login, logout, refreshToken, register } from "../controllers/auth.controller";
import { validateInput } from '../middlewares/middleware.validateInput';
import { loginSchema, registrationSchema } from "../schema";


const router = Router();

router.post('/login', validateInput(loginSchema), login) // login
router.post('/register', validateInput(registrationSchema) , register) // signup 
router.post('/refreshToken', refreshToken) // signup 
router.post('/logout', logout) // logout
 
export default router;
