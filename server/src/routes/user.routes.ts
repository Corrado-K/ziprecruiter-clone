import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller";


const router = Router();

router.post('/login', login) // login
router.post('/register', register) // signup 
router.post('logout', logout) // logout
 
export default router;
