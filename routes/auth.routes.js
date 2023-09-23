import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import userControllers from "../controllers/auth.controllers.js";

const router = Router();

router.post("/register", userControllers.postRegisterUser);
router.post("/login", userControllers.postLoginUser);
router.post("/logout", isAuthenticated, userControllers.postLogoutUser);

export default router;
