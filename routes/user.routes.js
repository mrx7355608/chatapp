import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import userControllers from "../controllers/user.controllers.js";

const router = Router();

router.use(isAuthenticated);
router.get("/all-users", userControllers.getAllUsers);
router.get("/me", userControllers.getMe);

export default router;
