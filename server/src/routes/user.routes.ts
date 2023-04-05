import { Router } from "express";
import { login, logout, refreshToken, register } from "../controllers/auth.controller";
import { validateInput } from '../middlewares/middleware.validateInput';
import { loginSchema, registrationSchema } from "../schema";


const router = Router();

router.post('/login', login) // login
router.post('/register', register) // signup 
router.post('/refreshToken', refreshToken) // signup 
router.post('/logout', logout) // logout
 
export default router;
