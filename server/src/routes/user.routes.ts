import { Router } from "express";
import { login, logout, refreshToken, register } from "../controllers/auth.controller";


const router = Router();

router.post('/login', login) // login
router.post('/register', register) // signup 
router.post('/refreshToken', refreshToken) // signup 
router.post('/logout', logout) // logout
 
export default router;
