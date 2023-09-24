import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import authControllers from "../controllers/auth.controllers.js";

const router = Router();

router.post("/register", authControllers.postRegisterUser);
router.post("/login", authControllers.postLoginUser);
router.post("/logout", isAuthenticated, authControllers.postLogoutUser);

export default router;
